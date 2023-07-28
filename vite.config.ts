import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    open: true,
    port: 3000
  },
  base: '/my_home_test'
})
