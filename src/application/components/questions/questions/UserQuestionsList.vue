<template>
	<div>
		<form class="d-flex justify-content-center options gap-0-75 mb-1">
			<select v-model="bestAnswers" class="form-select">
				<option v-for="choice in bestAnswersChoices" :key="choice.val" :value="choice.val">
					{{ choice.key }}
				</option>
			</select>
			<select v-model="answered" class="form-select">
				<option v-for="choice in answeredChoices" :key="choice.val" :value="choice.val">
					{{ choice.key }}
				</option>
			</select>
			<SelectSubject :subject-id.sync="subjectId" />
		</form>
		<QuestionCard v-for="question in questions" :key="question.hash" :question="question" />
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && questions.length === 0" message="No questions found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/hooks/users/user/questions'
import { useAuth } from '@app/hooks/auth/auth'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
export default defineComponent({
	name: 'UserQuestionsList',
	components: { QuestionCard, SelectSubject },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const {
			filteredQuestions: questions, subjectId, error, loading, hasMore,
			answered, answeredChoices, bestAnswersChoices, bestAnswers, fetchOlderQuestions
		} = useUserQuestionList(props.userId)
		return {
			id,
			questions, error, loading, hasMore, subjectId,
			answeredChoices, answered, bestAnswersChoices, bestAnswers,
			fetchOlderQuestions
		}
	}
})
</script>

<style lang="scss" scoped>
	.options {
		select {
			display: inline;
			max-width: 156px;
			border: 1px solid $color-line;
			padding: 0.25rem;
			background-color: $color-tags;
			@media (min-width: $md) {
				padding: 0.5rem;
			}
		}
		@media (min-width: $lg) {
			border-bottom: 1px solid $color-line;
		}
	}
</style>
