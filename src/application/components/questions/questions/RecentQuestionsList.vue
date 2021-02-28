<template>
	<div>
		<div class="d-flex">
			<h3 class="font-weight-bold">
				Recent Questions
			</h3>
			<form class="d-flex ml-auto">
				<select v-model="subjectId" class="form-control form-control-sm my-1">
					<option value="">
						All Subjects
					</option>
					<option v-for="subject in subjects" :key="subject.hash" :value="subject.id">
						{{ subject.name }}
					</option>
				</select>
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
import { useSubjectList } from '@app/hooks/questions/subjects'
export default defineComponent({
	name: 'RecentQuestionsList',
	components: { QuestionCard },
	props: {
		questionId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { subjects } = useSubjectList()
		const { filteredQuestions, error, loading, listener, subjectId } = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const recentQuestions = computed({
			get: () => filteredQuestions.value
				.filter((q) => q.id !== props.questionId)
				.slice(0, 5),
			set: () => {}
		})
		return { questions: recentQuestions, error, loading, subjects, subjectId }
	}
})
</script>
