<template>
	<div>
		<div v-for="rQuestion in questions" :key="rQuestion.hash">
			<QuestionCard :question="rQuestion" />
			<hr class="thin">
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/RecentQuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionCard },
	props: {
		questionId: {
			required: true,
			type: [String, null]
		}
	},
	setup (props) {
		const {
			filteredQuestions, error, loading,
			answeredChoices, answered, subjectId,
			startQuestionListener, closeQuestionListener
		} = useQuestionList()
		onMounted(startQuestionListener)
		onBeforeUnmount(closeQuestionListener)
		const recentQuestions = computed(() => filteredQuestions.value
			.filter((q) => q.id !== props.questionId)
			.slice(0, 5))
		return {
			questions: recentQuestions, error, loading,
			answeredChoices, answered, subjectId
		}
	}
})
</script>
