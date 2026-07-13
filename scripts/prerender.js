import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { createReadStream } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const indexPath = path.join(distDir, 'index.html')

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

function startServer() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    createReadStream(filePath)
      .on('error', () => {
        res.writeHead(404)
        res.end('Not found')
      })
      .pipe(res)
  })

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolve({ server, port })
    })
  })
}

async function prerender() {
  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found. Run `npm run build` first.')
    process.exit(1)
  }

  const { server, port } = await startServer()
  const url = `http://127.0.0.1:${port}/`

  let browser
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })

    // Wait for the main content to be rendered
    await page.waitForSelector('#main-content', { timeout: 10000 })

    // Give animations a moment to settle
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const renderedHtml = await page.content()

    // Write prerendered HTML back to dist/index.html
    fs.writeFileSync(indexPath, renderedHtml)
    console.log(`Prerendered ${indexPath} successfully.`)
  } catch (error) {
    console.error('Prerender failed:', error)
    process.exitCode = 1
  } finally {
    if (browser) await browser.close()
    server.close()
  }
}

prerender()
