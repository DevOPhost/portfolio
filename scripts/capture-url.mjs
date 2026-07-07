import { writeFileSync } from "node:fs";

const [
  , ,
  url,
  outputPath,
  waitArgument = "2200",
  widthArgument = "1440",
  heightArgument = "900",
  clipX,
  clipY,
  clipWidth,
  clipHeight
] = process.argv;

if (!url || !outputPath) {
  throw new Error("Use: node scripts/capture-url.mjs <url> <output-path> [wait-ms]");
}

const targets = await fetch("http://127.0.0.1:9222/json").then((response) => response.json());
const page = targets.find((target) => target.type === "page");

if (!page?.webSocketDebuggerUrl) {
  throw new Error("Nenhuma página disponível no Chrome remoto.");
}

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let commandId = 0;

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
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

await command("Page.enable");
await command("Runtime.enable");
await command("Emulation.setDeviceMetricsOverride", {
  width: Number(widthArgument),
  height: Number(heightArgument),
  deviceScaleFactor: 1,
  mobile: false
});
await command("Page.navigate", { url });
await new Promise((resolve) => setTimeout(resolve, Number(waitArgument)));
await command("Runtime.evaluate", {
  expression: 'document.documentElement.style.scrollBehavior = "auto"; document.documentElement.style.overflow = "hidden"; const target = location.hash ? document.querySelector(location.hash) : null; if (target) target.scrollIntoView(); else window.scrollTo(0, 0)'
});
await new Promise((resolve) => setTimeout(resolve, 250));

const screenshotOptions = {
  format: "png",
  captureBeyondViewport: false,
  fromSurface: true
};

if ([clipX, clipY, clipWidth, clipHeight].every((value) => value !== undefined)) {
  screenshotOptions.clip = {
    x: Number(clipX),
    y: Number(clipY),
    width: Number(clipWidth),
    height: Number(clipHeight),
    scale: 1
  };
}

const screenshot = await command("Page.captureScreenshot", screenshotOptions);

writeFileSync(outputPath, Buffer.from(screenshot.data, "base64"));
socket.close();
