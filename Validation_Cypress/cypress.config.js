import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Buraya baseUrl eklenir
    setupNodeEvents(on, config) {
      // Node event listener'ları buraya eklenir
    },
  },
});
