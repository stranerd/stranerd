<template>
	<div>
		<div v-for="rQuestion in questions" :key="rQuestion.hash">
			<QuestionCard :question="rQuestion" />
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
		const {
			filteredQuestions, error, loading,
			answeredChoices, answered, subjectId,
			listener
		} = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const recentQuestions = computed({
			get: () => filteredQuestions.value
				.filter((q) => q.id !== props.questionId)
				.slice(0, 5),
			set: () => {}
		})
		return {
			questions: recentQuestions, error, loading,
			answeredChoices, answered, subjectId
		}
	}
})
</script>
