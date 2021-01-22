<template>
	<div class="content">
		<QuestionsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
export default defineComponent({
	name: 'QuestionsPage',
	components: { QuestionsList	},
	layout: 'dashboard'
})
</script>

<style lang="scss" scoped>
.content {
	background-color: $color-white;
	padding: 0.5rem;
	border-radius: 0.5rem;
	box-shadow: 0 3px 10px rgba($color-black, 0.1);
	@media (min-width: $md) {
		padding: 0.75rem;
		border-radius: 1rem;
	}
	@media (min-width: $lg) {
		border-radius: 1.5rem;
		padding: 1rem;
	}
}
</style>
