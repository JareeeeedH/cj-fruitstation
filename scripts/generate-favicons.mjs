import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const svg = readFileSync(join(publicDir, "favicon.svg"));

const sizes = [
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(svg).resize(size, size).png().toFile(join(publicDir, name));
}

const png48 = await sharp(svg).resize(48, 48).png().toBuffer();
writeFileSync(join(publicDir, "favicon.ico"), png48);

console.log("Generated favicon-48x48.png, apple-touch-icon.png, favicon.ico");
