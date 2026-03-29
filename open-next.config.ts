import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Use dummy caches for a simple marketing site
  incrementalCache: "dummy",
  tagCache: "dummy",
  queue: "direct",
  cachePurge: "dummy",
});
