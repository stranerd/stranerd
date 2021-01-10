<template>
	<div>
		<h3 class="text-grey mb-0">
			Recent Questions
		</h3>
		<hr class="thick bg-light-grey">
		<div v-for="question in questions.slice(0, max)" :key="question.hash">
			<QuestionCard :question="question" />
			<hr class="thick">
		</div>
		<div v-if="hasMore || questions.length > max" class="text-center py-1 text-18">
			<NuxtLink class="font-weight-bold text-grey" to="/questions">
				LOAD MORE
			</NuxtLink>
		</div>
		<DisplayWarning v-if="!loading && !error && questions.length === 0" message="No questions found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/QuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'DashboardQuestionsList',
	components: { QuestionCard },
	setup () {
		const max = ref(5)
		const {
			filteredQuestions, error, loading, hasMore,
			fetchOlderQuestions, listener
		} = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			questions: filteredQuestions, error, loading, hasMore,
			max, fetchOlderQuestions
		}
	}
})
</script>
