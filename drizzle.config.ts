import type { Config } from 'drizzle-kit'

export default {
	schema: './backend/database/schema.ts',
	out: './backend/database/drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DB_URL!
	}
} satisfies Config
