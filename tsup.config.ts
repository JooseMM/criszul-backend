import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"], // usa módulos ESM
  outDir: "dist",
  target: "node18",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false, // no necesitamos .d.ts por ahora
});
