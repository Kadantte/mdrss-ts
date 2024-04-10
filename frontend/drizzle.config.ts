import type { Config } from 'drizzle-kit'

export default {
	schema: './src/server/database/schema.ts',
	out: './src/server/database/drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DB_URL!
	}
} satisfies Config
