<template>
	<div>
		<h3 class="mb-0">
			Questions
		</h3>
		<div class="thick" />
		<div v-for="question in questions" :key="question.hash">
			<QuestionCard :question="question" />
			<div class="thick" />
		</div>
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a class="font-weight-bold" @click.prevent="fetchOlderQuestions">LOAD MORE</a>
		</div>
		<DisplayWarning v-if="!loading && !error && questions.length === 0" message="This user has not asked any questions yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/hooks/users/user/questions'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'UserQuestionsList',
	components: { QuestionCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { questions, error, loading, hasMore, fetchOlderQuestions } = useUserQuestionList(props.userId)
		return {
			id,
			questions, error, loading, hasMore,
			fetchOlderQuestions
		}
	}
})
</script>
