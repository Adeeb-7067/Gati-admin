import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "index.html");

const targets = [
  join(root, "dist", "client", "index.html"),
  join(root, ".vercel", "output", "static", "index.html"),
];

if (!existsSync(source)) {
  console.warn("[ensure-index-html] Root index.html not found, skipping.");
  process.exit(0);
}

for (const target of targets) {
  const dir = dirname(target);
  if (!existsSync(dir)) continue;
  mkdirSync(dir, { recursive: true });
  copyFileSync(source, target);
  console.log(`[ensure-index-html] Copied index.html → ${target.replace(root, ".")}`);
}
