import { SQL, and, arrayContains, desc, eq, or } from 'drizzle-orm'
import { tChapters, tManga } from '../database/schema'
import { db } from '../database'

export const feedHandler = async (
	req: Request,
	url: URL
): Promise<Response> => {
	const rawQueries = url.searchParams
		.getAll('q')
		.map(v => v.split(',').filter(v => v))
		.filter(v => v.length)

	if (!rawQueries.length) return new Response('No queries', { status: 400 })
	if (rawQueries.length > 10)
		return new Response('Too many queries (> 10)', { status: 400 })

	const queries = rawQueries.map(q => parseQuery(q))
	if (queries.some(v => v[1] > 10 || v[1] === 0))
		return new Response(
			'Some queries have either 0 or too many matchers (> 10)',
			{ status: 400 }
		)

	const results = await executeQueries(queries)
	return new Response(JSON.stringify(results), {
		headers: { 'content-type': 'application/json' }
	})
}

function parseQuery(rawQuery: string[]) {
	const matchers = rawQuery.map(v => v.split(':')).filter(v => v.length === 2)
	let extracted = 0
	const extract = (key: string) =>
		matchers.filter(v => v[0] === key).map(v => (extracted++, v[1]))
	return [
		{
			manga: extract('manga'),
			users: extract('user'),
			groups: extract('groups'),
			languages: extract('tl'),
			originalLanguages: extract('ol'),
			tags: extract('tags')
		},
		extracted
	] as const
}
type ParsedQuery = ReturnType<typeof parseQuery>

async function executeQueries(queries: ParsedQuery[]) {
	return await db
		.select()
		.from(tChapters)
		.innerJoin(tManga, eq(tChapters.mangaUuid, tManga.id))
		.where(or(...queries.map(queryToSql)))
		.orderBy(desc(tChapters.publishedAt))
		.limit(20)
}

function queryToSql(query: ParsedQuery) {
	const q = query[0]
	let querySql: SQL[] = []

	// Chapter queries
	if (q.users.length) {
		querySql.push(or(...q.users.map(v => eq(tChapters.uploaderUuid, v)))!)
	}
	if (q.manga.length) {
		querySql.push(or(...q.manga.map(v => eq(tChapters.mangaUuid, v)))!)
	}
	if (q.languages.length) {
		querySql.push(
			or(...q.languages.map(v => eq(tChapters.translatedLanguage, v)))!
		)
	}
	if (query[0].groups.length) {
		querySql.push(arrayContains(tChapters.groupUuids, query[0].groups))
	}

	// Manga queries
	if (q.originalLanguages.length) {
		querySql.push(
			or(...q.originalLanguages.map(v => eq(tManga.originalLanguage, v)))!
		)
	}
	if (q.tags.length) {
		querySql.push(arrayContains(tManga.tagUuids, q.tags))
	}

	return and(...querySql)
}
