// TEMPORARY — CLIENT PREVIEW ONLY. REMOVE BEFORE GOING LIVE.
// See the removal checklist in .github/workflows/deploy-preview.yml
//
// Tailwind arbitrary background utilities (e.g. bg-[url('/images/foo.png')])
// compile to absolute `url(/images/foo.png)` in the emitted CSS. Next has no
// setting that rewrites those for `basePath`, so on Project Pages they resolve
// against the domain root and 404. This rewrites them in the exported CSS.
//
// Must match `basePath` in next.config.mjs.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE_PATH = "/xvintec";
const OUT_DIR = "out";

async function* cssFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* cssFiles(path);
    else if (entry.name.endsWith(".css")) yield path;
  }
}

// Absolute url(...) that is not already prefixed, and not a data:/http: URI.
const ABSOLUTE_URL = new RegExp(
  `url\\((['"]?)/(?!${BASE_PATH.slice(1)}/)`,
  "g"
);

let rewritten = 0;
let filesTouched = 0;

for await (const file of cssFiles(OUT_DIR)) {
  const css = await readFile(file, "utf8");
  const matches = css.match(ABSOLUTE_URL);
  if (!matches) continue;

  await writeFile(file, css.replace(ABSOLUTE_URL, `url($1${BASE_PATH}/`));
  rewritten += matches.length;
  filesTouched += 1;
}

console.log(
  `Prefixed ${rewritten} absolute CSS url() reference(s) with ${BASE_PATH} across ${filesTouched} file(s).`
);
