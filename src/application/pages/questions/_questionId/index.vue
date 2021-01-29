<template>
	<div>
		<PageLoading v-if="loading" />
		<div class="page-content">
			<QuestionPageCard v-if="question" :question="question" />
			<DisplayError v-else error="No such question found!" />
			<DisplayError :error="error" />
		</div>
		<div v-if="question" id="answers" class="page-content">
			<h2>Answers</h2>
			<AnswersList :question-id="questionId" />
		</div>
		<div class="page-content">
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
	layout: 'questions',
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
