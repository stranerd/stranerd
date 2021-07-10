<template>
	<div>
		<div class="d-flex justify-content-between align-items-center gap-1 px-1 mb-2">
			<h1 class="text-dark my-0">
				Questions
			</h1>
			<NuxtLink class="btn btn-primary-blue px-2 py-1" to="/questions/create">
				Ask A Question
			</NuxtLink>
		</div>

		<form class="d-flex options bl gap-1-5 px-1">
			<select v-model="answered" class="form-select">
				<option v-for="choice in answeredChoices" :key="choice.val" :value="choice.val">
					{{ choice.key }}
				</option>
			</select>
			<SelectSubject :subject-id.sync="subjectId" />
		</form>

		<QuestionCard v-for="question in questions" :key="question.hash" :question="question" class="bl" />
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && questions.length === 0" message="No questions found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/QuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { useAccountModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'QuestionsList',
	components: { SelectSubject, QuestionCard },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions, listener
		} = useQuestionList()
		const { isLoggedIn, user } = useAuth()
		const { openMeetTutor } = useAccountModal()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			questions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered, subjectId,
			user,
			isLoggedIn, openMeetTutor
		}
	}
})
</script>

<style lang="scss" scoped>
	.bl {
		border-bottom: 1px solid $color-line;
	}

	.options {
		select {
			display: inline;
			width: 156px;
			border: 1px solid $color-line;
			padding: 11px;
		}
	}
</style>
