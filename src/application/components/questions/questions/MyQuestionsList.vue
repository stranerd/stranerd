<template>
	<div>
		<div v-for="question in questions" :key="question.hash">
			<QuestionCard :question="question" />
			<hr class="thick">
		</div>
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a class="font-weight-bold" @click.prevent="fetchOlderQuestions">LOAD MORE</a>
		</div>
		<DisplayWarning v-if="!loading && questions.length === 0" message="You have not asked any questions yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/MyQuestionsListCard.vue'
import { useMyQuestionList } from '@app/hooks/account/questions'
export default defineComponent({
	name: 'MyQuestionsList',
	components: { QuestionCard },
	setup () {
		const { questions, error, loading, hasMore, fetchOlderQuestions } = useMyQuestionList()
		return {
			questions, error, loading, hasMore,
			fetchOlderQuestions
		}
	}
})
</script>
