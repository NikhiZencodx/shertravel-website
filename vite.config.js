import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      // Dev-only: mirrors Vercel /crm rewrites so hard-refresh works locally
      name: 'crm-spa-rewrite',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const urlPath = req.url.split('?')[0] // strip query string for file check
          if (urlPath === '/crm' || urlPath.startsWith('/crm/')) {
            const filePath = path.join(__dirname, 'public', urlPath)
            const isFile = fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()
            if (!isFile) {
              req.url = '/crm/index.html'
            }
          }
          next()
        })
      },
    },
  ],
})
