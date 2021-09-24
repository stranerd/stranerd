<template>
	<div>
		<div v-for="card in cards" :key="card.name" class="w-100 d-flex flex-sm-row flex-column-reverse align-items-center justify-content-center justify-content-sm-between filter px-3 mb-2">
			<span class="fw-bold text-primary">
				{{ card.name }}
			</span>
			<Icon
				class="text-line"
				size="study"
				:icon-name="card.icon"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'Study',
	layout: 'dashboard',
	setup () {
		const cards = [
			{
				name: 'Flashcards',
				icon: 'flashcard',
				link: 'nill'
			},
			{
				name: 'Test Prep',
				icon: 'test-prep',
				link: 'nill'
			},
			{
				name: 'Study Notes',
				icon: 'study-note',
				link: 'nill'
			},
			{
				name: 'Images',
				icon: 'images',
				link: 'nill'
			},
			{
				name: 'Videos',
				icon: 'videos',
				link: 'nill'
			},
			{
				name: 'Documents',
				icon: 'documents',
				link: 'nill'
			}
		]
		useMeta(() => ({
			title: 'Study | Stranerd'
		}))
		return { cards }
	},
	head: {}
})
</script>

<style lang="scss">
	.filter {
		box-shadow: 0 5px 10px rgba(19, 39, 64, 0.047);
		height: 11.25rem;
		font-size: 1.875rem;
		border-radius: 6px;
			@media (max-width: $sm) {
				font-size: 1rem;
				gap:1rem;
			}

	}
</style>
