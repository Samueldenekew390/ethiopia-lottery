import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          payment: path.resolve(__dirname, 'payment.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
