import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://aerahrah.github.io",
  markdown: {
    drafts: true,
  },
  head: {
    // add the Permissions-Policy header to allow the interest-cohort feature
    "Permissions-Policy": "interest-cohort=()",
  },
});
