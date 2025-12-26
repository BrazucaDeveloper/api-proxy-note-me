import { Hono } from "hono"
import { cors } from "hono/cors"
import type { JsonResponse } from "interfaces/response.ts"
import { safeDownloadNote } from "services/downloader/note.ts"

const sync = new Hono()

// Auth middleware for all sync routes
// sync.use('/*', isAuthUser)
// sync.use('/*', cors({ origin: process.env.TURSO_DATABASE_URL }))

sync.put('/upload', async (c) => { // upload 'upsert'
  
})

sync.get('/download', async (c) => { // Download
  const [notes, error] = await safeDownloadNote()
  
  if (error) return c.json<JsonResponse>({
    status: 500, message: error.message, data: []
  }, { status: 500 })

  return c.json<JsonResponse>({
    status: 201, message: 'success', data: notes
  }, { status: 201 })
})

export const SyncRoute: [string, Hono] = [ '/sync', sync ]
