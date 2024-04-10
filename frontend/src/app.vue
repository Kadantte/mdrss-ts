<template>
	<div class="mx-auto max-w-3xl p-4 mb-4 flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-3xl font-bold">MangaDex Feed Generator</h1>
			<p>
				Create RSS, Atom and JSON feeds for Mangadex. The project is
				<a href="https://github.com/kindlyfire/mdrss-ts" target="_blank"
					>open-source</a
				>.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="text-xl font-bold">1. Configure feed</h2>
			<p>
				Each query can filter by manga, groups, uploader, translated language,
				original language, and tags (inclusive or exclusive). All queries, up to
				10, will be combined into a single feed.
			</p>

			<Query v-for="(q, i) in queries" :key="i" :query="q" />

			<UButton
				square
				variant="soft"
				class="justify-center"
				@click="queries.push([{ type: 'manga', value: '' }])"
			>
				<UIcon name="ph:plus-bold" dynamic class="text-xl" />
				Add query
			</UButton>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="text-xl font-bold">2. Add URL to RSS reader</h2>
			<div class="card flex items-center gap-2">
				<UButton square @click="copyToClipboard">
					<UIcon name="ph:copy-bold" dynamic class="text-xl" />
				</UButton>
				<div class="truncate font-mono">{{ url }}</div>
			</div>
		</div>
	</div>

	<UNotifications />
</template>

<script lang="ts" setup>
import type { Query } from './types'
const toast = useToast()

const queries = reactive([
	[
		{
			type: 'manga',
			value: ''
		}
	]
]) as Query[]

const url = computed(() => {
	const params = new URLSearchParams()
	for (const q of queries) {
		params.append('q', q.map(v => v.type + ':' + v.value).join(','))
	}
	return `${window.location.origin}/feed?${params}`
})

async function copyToClipboard() {
	await navigator.clipboard.writeText(url.value)
	toast.add({
		title: 'Copied to clipboard',
		timeout: 2000
	})
}
</script>

<style>
.card {
	@apply border shadow p-2 rounded-xl;
}

a {
	@apply text-primary-500 underline;
}
</style>
