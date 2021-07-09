<template>
	<div class="d-flex flex-column gap-1">
		<h2 class="headerStyle">
			Similar Questions
		</h2>
		<QuestionCard v-for="question in questions" :key="question.hash" :question="question" class="pb-1" />
		<span>
			<DisplayWarning v-if="!loading && !error && questions.length === 0" message="No other questions found." />
			<DisplayError :error="error" />
		</span>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/RecentQuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'SimilarQuestionsList',
	components: { QuestionCard },
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
		// TODO: Reimplement logic for similar questions
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

<style lang="scss" scoped>
	.headerStyle {
		font-weight: bold;
		color: $color-text-main;
		margin-bottom: 0;
	}
</style>
