<template>
	<section class="layout-body">
		<main class="layout-main p-0">
			<QuestionTopNavigation />
			<Nuxt class="content layout-content" />
		</main>
		<ModalBase />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionTopNavigation from '@app/components/layouts/topNavigations/QuestionTopNavigation.vue'
import ModalBase from '@app/components/modals/Base.vue'
export default defineComponent({
	name: 'QuestionsLayout',
	components: {
		QuestionTopNavigation,
		ModalBase
	}
})
</script>

<style lang="scss" scoped>
.content {
	margin: 0 auto;
	max-width: $lg;
}
</style>
