import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { SyncRoute } from './routes/sync.js'

const app = new Hono().basePath('/v1')

app.route(...SyncRoute)

app.get('/', c =>  c.text(`Welcome to Proxy Note Me!`))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
