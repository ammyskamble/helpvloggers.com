import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically pops open the browser window on launch
    host: '0.0.0.0', // Dual-stack IPv4 & IPv6
    port: 4321,
    strictPort: false,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  preview: {
    open: true,
    host: '0.0.0.0',
    port: 4321,
    strictPort: false
  }
});
