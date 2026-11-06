import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";

function inlineDashboardAssets() {
  let outputDirectory = "";

  return {
    name: "inline-dashboard-assets",
    apply: "build" as const,
    configResolved(config: { root: string; build: { outDir: string } }) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const htmlPath = resolve(outputDirectory, "index.html");
      let html = await readFile(htmlPath, "utf8");

      const scriptPattern =
        /<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*>\s*<\/script>/i;
      const scriptMatch = scriptPattern.exec(html);
      if (!scriptMatch) {
        throw new Error("Could not find the dashboard JavaScript bundle.");
      }

      const scriptPath = resolve(outputDirectory, scriptMatch[1]);
      const script = await readFile(scriptPath, "utf8");
      html = html.replace(
        scriptPattern,
        () =>
          `<script type="module">${script.replace(/<\/script/gi, "<\\/script")}</script>`,
      );

      const stylePattern =
        /<link\b[^>]*\bhref="([^"]+\.css)"[^>]*>/i;
      const styleMatch = stylePattern.exec(html);
      if (styleMatch) {
        const stylePath = resolve(outputDirectory, styleMatch[1]);
        const style = await readFile(stylePath, "utf8");
        html = html.replace(stylePattern, () => `<style>${style}</style>`);
      }

      await writeFile(htmlPath, html);
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [inlineDashboardAssets()],
  build: {
    rollupOptions: {
      input: ["index.html", "project-map.html"],
    },
  },
});
