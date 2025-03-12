import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [".ngrok-free.app"], // Allow any ngrok subdomain
    host: true, // Allow external access
    port: 5173 || port, // Change to your app's port if different
  },
});
