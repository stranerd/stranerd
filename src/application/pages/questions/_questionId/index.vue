<template>
	<div class="d-flex flex-column">
		<PageLoading v-if="loading" />
		<div class="d-flex flex-column">
			<QuestionPageCard v-if="question" :key="question.hash" :question="question" />
			<DisplayError v-else error="No such question found!" />
			<DisplayError :error="error" />
		</div>
		<template v-if="question">
			<div id="answers">
				<AnswersList :question="question" />
			</div>
			<QuestionsList :question-id="questionId" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useRoute } from '@nuxtjs/composition-api'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
import QuestionsList from '@app/components/questions/questions/SimilarQuestionsList.vue'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionPage',
	components: { QuestionPageCard, AnswersList, QuestionsList },
	layout: 'justified',
	setup () {
		const { questionId } = useRoute().value.params
		const { error, loading, question, listener } = useQuestion(questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { questionId, question, error, loading }
	}
})
</script>
