<template>
	<div>
		<div class="d-flex">
			<h3 class="fw-bold mb-0">
				Recent Questions
			</h3>
			<form class="d-flex ms-auto">
				<SelectSubject :subject-id.sync="subjectId" class="form-control-sm my-1" />
			</form>
		</div>
		<div class="thick" />
		<div v-for="question in questions" :key="question.hash">
			<QuestionCard :question="question" />
			<div class="thick" />
		</div>
		<DisplayWarning v-if="!loading && !error && questions.length === 0" message="No other questions found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/RecentQuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
export default defineComponent({
	name: 'RecentQuestionsList',
	components: { QuestionCard, SelectSubject },
	props: {
		questionId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { filteredQuestions, error, loading, listener, subjectId } = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const recentQuestions = computed({
			get: () => filteredQuestions.value
				.filter((q) => q.id !== props.questionId)
				.slice(0, 5),
			set: () => {}
		})
		return { questions: recentQuestions, error, loading, subjectId }
	}
})
</script>
