import { writeFileSync } from "node:fs";

const [, , widthArg = "1440", heightArg = "1000", outputPath, selector, action] = process.argv;
const width = Number(widthArg);
const height = Number(heightArg);
const targets = await fetch("http://127.0.0.1:9222/json").then((response) => response.json());
const page = targets.find((target) => target.type === "page");

if (!page?.webSocketDebuggerUrl) {
  throw new Error("Nenhuma página disponível no Chrome remoto.");
}

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
const issues = [];
let commandId = 0;

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") {
    issues.push(message.params.exceptionDetails.text);
  }
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
    const detail = message.params.args
      .map((argument) => argument.value ?? argument.description ?? argument.type)
      .join(" ");
    issues.push(`console.error: ${detail}`);
  }
  const handler = pending.get(message.id);
  if (!handler) return;
  pending.delete(message.id);
  if (message.error) handler.reject(new Error(message.error.message));
  else handler.resolve(message.result);
});

function command(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await command("Runtime.enable");
await command("Page.enable");
await command("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width <= 640
});
await command("Page.reload", { ignoreCache: true });
await new Promise((resolve) => setTimeout(resolve, 1300));
await command("Runtime.evaluate", {
  expression: 'document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, 0)'
});
await new Promise((resolve) => setTimeout(resolve, 250));

if (selector) {
  await command("Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: "start" })`
  });
  await new Promise((resolve) => setTimeout(resolve, 650));
}

if (selector && action === "click") {
  await command("Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(selector)})?.click()`
  });
  await new Promise((resolve) => setTimeout(resolve, 750));
}

const result = await command("Runtime.evaluate", {
  returnByValue: true,
  expression: `JSON.stringify({
    viewport: [innerWidth, innerHeight],
    bodyWidth: document.body.scrollWidth,
    rootWidth: document.documentElement.scrollWidth,
    bodyHeight: document.body.scrollHeight,
    rootHeight: document.documentElement.scrollHeight,
    overflow: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth,
    verticalOverflow: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) > innerHeight,
    missingImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
    headings: [...document.querySelectorAll("h1, h2")].map((heading) => heading.textContent.trim()),
    dialogs: document.querySelectorAll('[role="dialog"]').length
  })`
});

if (outputPath) {
  const screenshot = await command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
    fromSurface: true
  });
  writeFileSync(outputPath, Buffer.from(screenshot.data, "base64"));
}

console.log(JSON.stringify({
  metrics: JSON.parse(result.result.value),
  runtimeIssues: issues
}, null, 2));

socket.close();
