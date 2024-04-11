<template>
	<div class="mx-auto max-w-3xl p-4 mb-4 flex flex-col gap-4">
		<NuxtPage />
	</div>

	<UNotifications />
</template>

<script lang="ts" setup></script>

<style>
.card {
	@apply border shadow p-2 rounded-xl;
}

a {
	@apply text-primary-500 underline;
}
</style>
