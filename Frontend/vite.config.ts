import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Keeps HMR from breaking
  },
  server: {
    host: true,      // Allows access from network (optional, useful for mobile testing)
    port: 5174,      // ✅ Change port from default 5173 (fixes ERR_CONNECTION issues)
    strictPort: false, // If port is busy, Vite auto-selects a new one
  },
});
