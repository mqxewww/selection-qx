import { $ } from "bun";

void (async () => {
  await $`bun -b run build`;

  await Promise.all([
    $`tsc -p tsconfig.build.json --watch --preserveWatchOutput`,
    $`bun -b --watch src/index.ts`,
  ]);
})();
