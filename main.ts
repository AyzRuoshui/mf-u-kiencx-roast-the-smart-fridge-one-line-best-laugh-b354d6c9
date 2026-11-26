import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// 终稿：冰箱以「帮你戒奶」为由自动下单牛奶，再让你给毁掉计划的配送打分。
// 具体行为（自动 reorder、请求评分）与荒诞逻辑并置，结尾落在评分的反讽上。
const ENTRY = "My fridge reordered milk because I'm \"cutting dairy,\" then asked me to rate the delivery that ruined it.";
const MAX_CODE_POINTS = 160;
const UTF8: BufferEncoding = "utf8";
const FALLBACK_OUTPUT_DIR = "/output";
const ENTRY_FILE = "entry.txt";
const STRICT_UTF8 = new TextDecoder(UTF8, { fatal: true, ignoreBOM: true });

// 校验：无 BOM、非纯空白、单行无控制字符、1-160 码点、严格 UTF-8 解码。
function validateEntry(raw: string): string {
  if (raw.startsWith("\uFEFF")) throw new Error("entry must not start with a BOM");
  const text = raw.trim();
  if (!text) throw new Error("entry must be non-empty");
  if (/[\r\n\u0000-\u001f\u007f]/u.test(text)) throw new Error("entry must be a single clean line");
  const points = [...text];
  if (points.length < 1 || points.length > MAX_CODE_POINTS) {
    throw new Error("entry must be 1-160 code points");
  }
  const bytes = Buffer.from(text, UTF8);
  try {
    if (STRICT_UTF8.decode(bytes) !== text) throw new Error("UTF-8 mismatch");
  } catch {
    throw new Error("entry must be strict UTF-8");
  }
  return text;
}

// 输出目录：环境变量去除首尾空白后为空则回退默认目录；相对路径按当前工作目录解析。
function resolveOutputDir(configured: string | undefined): string {
  const trimmed = configured?.trim();
  return resolve(trimmed && trimmed.length > 0 ? trimmed : FALLBACK_OUTPUT_DIR);
}

const text = validateEntry(ENTRY);
const outputDir = resolveOutputDir(process.env.MAKEFUN_OUTPUT_DIR);
mkdirSync(outputDir, { recursive: true });
writeFileSync(resolve(outputDir, ENTRY_FILE), text, { encoding: UTF8, mode: 0o644 });
