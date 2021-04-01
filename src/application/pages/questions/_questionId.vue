<template>
	<div>
		<PageLoading v-if="loading" />
		<div class="page-content my-1 my-md-2">
			<QuestionPageCard v-if="question" :key="question.hash" :question="question" />
			<DisplayError v-else error="No such question found!" />
			<DisplayError :error="error" />
		</div>
		<div v-if="question" id="answers" class="page-content my-1 my-md-2">
			<AnswersList :question="question" />
		</div>
		<QuestionsList class="page-content my-1 my-md-2" :question-id="questionId" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useRoute } from '@nuxtjs/composition-api'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
import QuestionsList from '@app/components/questions/questions/RecentQuestionsList.vue'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionPage',
	components: { QuestionPageCard, AnswersList, QuestionsList },
	setup () {
		const { questionId } = useRoute().value.params
		const { error, loading, question, listener } = useQuestion(questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { questionId, question, error, loading }
	}
})
</script>
