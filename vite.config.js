import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base deve combaciare col nome della repo GitHub:
// https://<utente>.github.io/cartavinai-wireframe/
export default defineConfig({
  base: '/cartavinai-wireframe/',
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});
