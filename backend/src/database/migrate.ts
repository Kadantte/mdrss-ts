import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

if (!process.env.DB_URL) throw new Error('DB_URL is required')

const migrationClient = postgres(process.env.DB_URL, { max: 1 })
await migrate(drizzle(migrationClient), {
	migrationsFolder: 'src/database/drizzle'
})

console.log('Done.')
process.exit(0)
