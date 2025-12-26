import { db } from "db/client.ts"
import { note } from "db/schema.ts"
import { tryCatchWrapper } from "utils/try-catch-wrapper.ts"

export const safeDownloadNote = tryCatchWrapper(async () => {
  return await db.select().from(note)
})
