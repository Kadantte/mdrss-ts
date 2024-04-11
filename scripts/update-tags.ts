import fs from 'fs/promises'
import path from 'path'

const res = await fetch('https://api.mangadex.org/manga/tag')

const tags = ((await res.json()).data as any[])
	.map(t => {
		return {
			id: t.id as string,
			name: t.attributes.name.en as string
		}
	})
	.sort((a, b) => a.name.localeCompare(b.name))

await fs.writeFile(
	path.join(__dirname, '../frontend/src/assets/tags.json'),
	JSON.stringify(tags, null, '\t')
)
