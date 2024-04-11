<template>
	<div class="flex flex-col gap-2">
		<h1 class="text-3xl font-bold">MangaDex Feed Generator</h1>
		<p>
			Create RSS feeds for Mangadex. The project is
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

		<Query
			v-for="(q, i) in queries"
			:key="i"
			:query="q"
			@remove="removeQuery(i)"
		/>

		<div class="flex gap-2">
			<UButton
				square
				variant="soft"
				class="justify-center grow"
				@click="queries.push([{ type: 'manga', value: '' }])"
			>
				<UIcon name="ph:plus-bold" dynamic class="text-xl" />
				Add query
			</UButton>
			<UButton
				square
				variant="soft"
				color="red"
				title="Reset"
				@click="queries.splice(0, queries.length), addDefaultQuery()"
			>
				<UIcon name="ph:arrow-counter-clockwise-bold" dynamic class="text-xl" />
			</UButton>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="text-xl font-bold">2. Add URL to RSS reader</h2>
		<div class="card flex items-center gap-2">
			<UButton square @click="copyToClipboard">
				<UIcon name="ph:copy-bold" dynamic class="text-xl" />
				Copy
			</UButton>
			<div class="font-mono">{{ url }}</div>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<p>How queries work:</p>

		<ul class="list-disc ml-5">
			<li>Each query is combined with an OR.</li>
			<li>Matchers are grouped by type, combined into a query with AND.</li>
			<li>
				Each matcher within a type is combined with an OR. For the "Tags
				(inclusive)" matcher, it is AND.
			</li>
		</ul>

		<p>Some examples:</p>

		<ul class="list-disc ml-5">
			<li>
				Specify two manga and a language: Chapters from either manga will be
				returned, but only of the specified language.
			</li>
			<li>
				Specify two tags (inclusive) and two tags (exclusive): The manga of the
				result chapters will have all inclusive tags, and will not have any of
				the exclusive tags.
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import type { Query } from '../types'
const toast = useToast()

const queries = reactive([]) as Query[]
function addDefaultQuery() {
	queries.push([{ type: 'manga', value: '' }])
}
addDefaultQuery()

const isClient = ref(false)
onMounted(() => (isClient.value = true))

const url = computed(() => {
	const params = new URLSearchParams()
	for (const q of queries) {
		params.append('q', q.map(v => v.type + ':' + v.value).join(','))
	}

	if (!isClient.value) return ''
	return `${window.location.origin}/feed?${params
		.toString()
		.replaceAll('%3A', ':')
		.replaceAll('%2C', ',')}`
})

function removeQuery(i: number) {
	queries.splice(i, 1)
	if (queries.length === 0) addDefaultQuery()
}

async function copyToClipboard() {
	await navigator.clipboard.writeText(url.value)
	toast.add({
		title: 'Copied to clipboard',
		timeout: 2000
	})
}

useHead({})
useSeoMeta({
	title: 'MangaDex Feed Generator',
	description: 'Create RSS feeds for Mangadex.'
})
</script>

<style></style>
