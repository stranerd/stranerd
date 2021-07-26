<template>
	<div>
		<div class="question-body">
			<h1>Ask Your Question</h1>

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
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
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
		return { loading, createQuestion, factory, error, coins }
	}
})
</script>

<style lang="scss" scoped>
	.question-body {
		h1 {
			color: $color-dark;
			font-size: 36px;
			margin-bottom: 1.25rem;
		}
		@media (min-width: $lg) {
			background: $color-tags;
			border: 1px solid $color-line;
			padding: 3rem;
		}
	}
</style>
