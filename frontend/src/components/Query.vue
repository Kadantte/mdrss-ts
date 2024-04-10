<template>
	<div class="card flex flex-col gap-2">
		<div class="flex items-center gap-2" v-for="(m, i) in query">
			<USelect
				:options="options"
				option-attribute="label"
				value-attribute="value"
				v-model="m.type"
			></USelect>
			<UInput class="grow font-mono" v-model="m.value"></UInput>
			<UButton square variant="soft" @click="query.splice(i, 1)">
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
</script>
