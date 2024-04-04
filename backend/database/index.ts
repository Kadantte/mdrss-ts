import * as schema from './schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

if (!process.env.DB_URL) throw new Error('DB_URL is required')

// const migrationClient = postgres(process.env.DB_URL, { max: 1 })
// await migrate(drizzle(migrationClient), {
// 	migrationsFolder: 'backend/database/drizzle'
// })

const queryClient = postgres(process.env.DB_URL)
export const db = drizzle(queryClient, { schema })
