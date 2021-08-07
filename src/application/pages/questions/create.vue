<template>
	<div>
		<div class="question-body">
			<Heading variant="1" class="mb-1-25 text-dark">
				Ask Your Question
			</Heading>

			<QuestionForm
				:submit="createQuestion"
				:loading="loading"
				:factory="factory"
				:error="error"
				:coins="coins"
			>
				<template slot="buttonText">
					Post Question
				</template>
			</QuestionForm>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useMeta } from '@nuxtjs/composition-api'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/hooks/questions/questions'
import { analytics } from '@modules/core'
export default defineComponent({
	name: 'QuestionCreatePage',
	components: { QuestionForm },
	layout: 'justified',
	middleware: ['isAuthenticated'],
	setup () {
		const { loading, createQuestion, factory, error, coins } = useCreateQuestion()
		onMounted(() => {
			analytics.logEvent('ask_question_start')
		})
		useMeta({
			title: 'Ask a Question | Stranerd'
		})
		return { loading, createQuestion, factory, error, coins }
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.question-body {
		@media (min-width: $lg) {
			background: $color-tags;
			border: 1px solid $color-line;
			padding: 3rem;
		}
	}
</style>
