import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/', // ✅ Ensures proper routing for Netlify and GitHub Pages
  plugins: [react()],
  server: {
    historyApiFallback: true, // This ensures React Router handles page reloads
  },
});
