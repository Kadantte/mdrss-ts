import { desc } from 'drizzle-orm'
import { db } from '../../database'
import { tChapters, tManga, tUsers } from '../../database/schema'
import { fetchChaptersSince, type MdChapter } from './fetch'
import dayjs from 'dayjs'

export async function updateChapters() {
	const latestChapter = await db.query.tChapters.findFirst({
		orderBy: desc(tChapters.publishedAt)
	})
	const chapters = await fetchChaptersSince(
		latestChapter?.publishedAt || dayjs().subtract(30, 'days').toDate()
	)

	for (const chapter of chapters) {
		await saveUser(chapter.uploader)
		await saveManga(chapter.manga)
		await saveChapter(chapter)
	}

	console.log(`Updated ${chapters.length} chapters`)
}

async function saveUser(user: MdChapter['uploader']) {
	const data = { username: user.username }
	await db
		.insert(tUsers)
		.values({ id: user.id, ...data })
		.onConflictDoUpdate({
			target: tUsers.id,
			set: data
		})
}

async function saveManga(manga: MdChapter['manga']) {
	const data = {
		title: manga.title,
		originalLanguage: manga.originalLanguage,
		tagUuids: manga.tags.map(t => t.id)
	}
	await db
		.insert(tManga)
		.values({ id: manga.id, ...data })
		.onConflictDoUpdate({
			target: tManga.id,
			set: data
		})
}

async function saveChapter(chapter: MdChapter) {
	const data = {
		mangaUuid: chapter.manga.id,
		publishedAt: new Date(chapter.publishedAt),
		title: chapter.title,
		translatedLanguage: chapter.translatedLanguage,
		volume: chapter.volume,
		uploaderUuid: chapter.uploader.id,
		chapter: chapter.chapter,
		groupUuids: chapter.groups.map(g => g.id)
	}
	await db
		.insert(tChapters)
		.values({ id: chapter.id, ...data })
		.onConflictDoUpdate({
			target: tChapters.id,
			set: data
		})
}
