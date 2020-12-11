<template>
	<div class="px-1">
		<div class="content my-1 my-md-2 my-lg-4">
			<QuestionPageCard v-if="question" :question="question" />
			<div v-else>
				<p>Question doesn't exist</p>
			</div>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
		<div v-if="question && question.answers > 0" class="content my-1 my-md-2 my-lg-4">
			<h1>Answers</h1>
		</div>
		<div class="content my-1 my-md-2 my-lg-4">
			<h1>Recent Questions</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useContext } from '@nuxtjs/composition-api'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'RootQuestionPage',
	components: {
		QuestionPageCard
	},
	layout: 'rootQuestionsSingle',
	middleware: [],
	setup () {
		const { questionId } = useContext().route.value.params
		const { question, error, loading, startListener, closeListener } = useQuestion(questionId)
		onMounted(startListener)
		onBeforeUnmount(closeListener)
		return {
			question, error, loading
		}
	}
})
</script>

<style lang="scss" scoped>
.content {
	background: $color-white;
	padding: 0.5rem;
	border-radius: 0.5rem;
	box-shadow: 0 0 12px rgba($color-black, 0.1);
	@media (min-width: $md) {
		padding: 1.5rem;
		border-radius: 1rem;
	}
	@media (min-width: $lg) {
		padding: 2.0rem;
		border-radius: 1.5rem;
	}
}
</style>
