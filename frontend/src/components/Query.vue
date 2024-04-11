<template>
	<div class="card flex flex-col gap-2">
		<div class="flex items-center gap-2" v-for="(m, i) in query">
			<USelect
				:options="options"
				option-attribute="label"
				value-attribute="value"
				v-model="m.type"
			></USelect>
			<UInput
				class="grow font-mono"
				v-model="m.value"
				:placeholder="matcherPlaceholders[m.type]"
			></UInput>
			<UButton square variant="soft" @click="removeMatcher(i)">
				<UIcon name="ph:x-bold" dynamic class="text-xl" />
			</UButton>
		</div>
		<UButton
			square
			variant="soft"
			class="justify-center"
			@click="query.length < 10 && query.push({ type: 'manga', value: '' })"
		>
			<UIcon name="ph:plus-bold" dynamic class="text-xl" />
			Add matcher
		</UButton>
	</div>
</template>

<script lang="ts" setup>
import type { Query } from '../types'

const props = defineProps<{
	query: Query
}>()
const emit = defineEmits<{
	remove: []
}>()

function removeMatcher(i: number) {
	props.query.splice(i, 1)
	if (props.query.length === 0) emit('remove')
}

const options = [
	{
		label: 'Manga ID',
		value: 'manga'
	},
	{
		label: 'Group ID',
		value: 'groups'
	},
	{
		label: 'Uploader ID',
		value: 'user'
	},
	{
		label: 'Translated language',
		value: 'tl'
	},
	{
		label: 'Original language',
		value: 'ol'
	},
	{
		label: 'Tags (inclusive)',
		value: 'tags'
	},
	{
		label: 'Tags (exclusive)',
		value: 'ntags'
	}
]

const matcherPlaceholders = {
	manga: 'UUID',
	groups: 'UUID',
	user: 'UUID',
	tl: 'Language code',
	ol: 'Language code',
	tags: 'UUID',
	ntags: 'UUID'
}
</script>
