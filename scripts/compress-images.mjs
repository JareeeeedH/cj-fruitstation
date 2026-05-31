import sharp from "sharp";
import { readdirSync, unlinkSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(rootDir, "public");

/** @type {Record<string, { maxWidth: number; quality: number }>} */
const overrides = {
  "juice-1.png": { maxWidth: 1200, quality: 82 },
  "juice-2.png": { maxWidth: 960, quality: 80 },
  "homePhoto-3.jpg": { maxWidth: 1600, quality: 85 },
};

const menuDefaults = { maxWidth: 960, quality: 80 };
const imagePattern = /\.(png|jpe?g)$/i;

const files = readdirSync(publicDir).filter((name) => imagePattern.test(name));

let beforeBytes = 0;
let afterBytes = 0;

console.log("Compressing images to WebP...\n");

for (const file of files) {
  const inputPath = join(publicDir, file);
  const outputName = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const outputPath = join(publicDir, outputName);

  const config =
    overrides[file] ??
    (file.startsWith("menu-") ? menuDefaults : { maxWidth: 1400, quality: 82 });

  const inputSize = statSync(inputPath).size;
  beforeBytes += inputSize;

  const meta = await sharp(inputPath).metadata();
  const width =
    meta.width && meta.width > config.maxWidth ? config.maxWidth : undefined;

  await sharp(inputPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: config.quality, effort: 6 })
    .toFile(outputPath);

  const outputSize = statSync(outputPath).size;
  afterBytes += outputSize;

  unlinkSync(inputPath);

  const saved = Math.round((1 - outputSize / inputSize) * 100);
  console.log(
    `${file.padEnd(28)} ${formatKB(inputSize)} → ${formatKB(outputSize)}  (-${saved}%)`
  );
}

console.log(
  `\nTotal: ${formatMB(beforeBytes)} → ${formatMB(afterBytes)}  (-${Math.round(
    (1 - afterBytes / beforeBytes) * 100
  )}%)`
);

function formatKB(bytes) {
  return `${Math.round(bytes / 1024)} KB`.padStart(8);
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
