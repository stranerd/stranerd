<template>
	<div>
		<PageLoading v-if="loading" />
		<div class="content">
			<QuestionPageCard v-if="question" :question="question" />
			<DisplayError v-else error="No such question found!" />
			<DisplayError :error="error" />
		</div>
		<div id="answers" class="content">
			<h2>Answers</h2>
			<AnswersList :question-id="questionId" />
		</div>
		<div class="content">
			<h2>Recent Questions</h2>
			<hr class="thin">
			<QuestionsList :question-id="questionId" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useContext } from '@nuxtjs/composition-api'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
import QuestionsList from '@app/components/questions/questions/RecentQuestionsList.vue'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionPage',
	components: {
		QuestionPageCard,
		AnswersList,
		QuestionsList
	},
	layout: 'question',
	setup () {
		const { questionId } = useContext().route.value.params
		const { error, loading, question, listener } = useQuestion(questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			questionId,
			question, error, loading
		}
	}
})
</script>

<style lang="scss" scoped>
.content {
	background: $color-white;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 0.5rem;
	box-shadow: 0 0 12px rgba($color-black, 0.1);
	@media (min-width: $md) {
		padding: 1.5rem;
		margin: 1rem 0;
		border-radius: 1rem;
	}
	@media (min-width: $lg) {
		padding: 2.0rem;
		margin: 2rem 0;
		border-radius: 1.5rem;
	}
}
</style>
