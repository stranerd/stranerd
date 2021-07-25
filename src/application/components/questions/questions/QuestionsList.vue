<template>
	<div>
		<div class="d-flex text-white align-items-center gap-0-5 d-md-none position-fixed" style="right: 1.5rem; bottom: 1.5rem; z-index: 10;">
			<span class="bg-primary small rounded-3 py-0-25 px-0-5">
				Ask your question
			</span>
			<NuxtLink class="d-flex align-items-center justify-content-center rounded-pill bg-primary" style="width: 3rem; height: 3rem; font-size: 1.5rem;" to="/questions/create">
				+
			</NuxtLink>
		</div>

		<div class="d-flex justify-content-between align-items-center gap-1 mb-1 mb-md-2 ">
			<h1 class="text-dark my-0 d-flex align-items-center questions">
				<div class="dash me-0-5" />
				<span>Questions</span>
				<div class="dash ms-0-5" />
			</h1>
			<NuxtLink class=" btn btn-primary px-2 py-1 d-none d-md-inline" to="/questions/create">
				Ask A Question
			</NuxtLink>
		</div>

		<form class="d-flex options gap-1-5">
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
import { defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/QuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
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
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			questions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered, subjectId,
			user, isLoggedIn
		}
	}
})
</script>

<style lang="scss" scoped>
	.options {
		justify-content: center;
		@media (min-width: $md) {
			justify-content: flex-start;
			border-bottom: 1px solid $color-line;
		}

		select {
			display: inline;
			width: 156px;
			border: 1px solid $color-line;
			padding: 0.25rem;
			background-color: $color-tags;
			@media (min-width: $md) {
				padding: 0.5rem;
			}
		}
	}

	.dash {
		width: 100%;
		background-color: $color-line;
		border: 1px solid $color-line;
		@media (min-width: $md) { display: none; }
	}

	.questions {
		width: 100%;
		@media (min-width: $md) { width: 50%; }
	}
</style>
