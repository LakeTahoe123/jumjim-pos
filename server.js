const express = require('express')
const next = require('next')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/service-worker.js', (req, res) => {
      // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
      res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
      res.set("Content-Type", "application/javascript")

      let swPath
      if (dev) {
        swPath = path.resolve("./static/service-worker.js")
        console.log('dev - sw from static', swPath)
      } else {
        swPath = path.resolve("./.next/service-worker.js")
        console.log('next - sw from next', swPath)
      }
      app.serveStatic(req, res, swPath)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })