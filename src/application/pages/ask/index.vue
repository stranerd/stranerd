<template>
	<div>
		<div class="question-body">
			<h1>Ask Your Question</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Ranking',
	layout: 'justified'
})
</script>

<style lang="scss" scoped>
	.question-body {
		max-width: 960px;

		h1 {
			color: $color-text-main;
		}
	}
</style>
