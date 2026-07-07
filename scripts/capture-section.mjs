import { writeFileSync } from "node:fs";

const [, , sectionId, outputPath] = process.argv;

if (!sectionId || !outputPath) {
  throw new Error("Use: node scripts/capture-section.mjs <section-id> <output-path>");
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

await command("Runtime.evaluate", {
  expression: `document.documentElement.style.scrollBehavior = "auto"; document.getElementById(${JSON.stringify(sectionId)})?.scrollIntoView({ block: "start" })`
});
await new Promise((resolve) => setTimeout(resolve, 900));
const screenshot = await command("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: false,
  fromSurface: true
});

writeFileSync(outputPath, Buffer.from(screenshot.data, "base64"));
socket.close();
