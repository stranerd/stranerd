<template>
	<div class="d-flex flex-column ">
		<PageLoading v-if="loading" />
		<div class="col-12 d-flex flex-column">
			<div v-if="true" class="mb-1">
				<SingleQuestion />
			</div>
			<div v-else class="col-12">
				<DisplayError error="No such question found!" />
				<DisplayError :error="error" />
			</div>
		</div>
		<div v-if="true" id="answers" class="col-12 d-flex flex-column">
			<AnswersList />
		</div>
		<div class="col-12 d-flex flex-column">
			<SimilarQuestions />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useRoute } from '@nuxtjs/composition-api'
import SingleQuestion from '@app/components/questions/questions/SingleQuestion.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
// import QuestionsList from '@app/components/questions/questions/RecentQuestionsList.vue'
import SimilarQuestions from '@app/components/questions/questions/SimilarQuestions.vue'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionPage',
	components: { SingleQuestion, AnswersList, SimilarQuestions },
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
