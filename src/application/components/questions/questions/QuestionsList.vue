<template>
	<div>
		<section class="d-flex flex-column flex-md-row align-items-center text-center">
			<h2 class="font-weight-bold mb-0">
				Questions
			</h2>
			<form class="d-flex ml-md-auto">
				<select v-model="answered" class="form-control form-control-sm mr-1 my-1">
					<option v-for="choice in answeredChoices" :key="choice.val" :value="choice.val">
						{{ choice.key }}
					</option>
				</select>
				<SelectSubject :subject-id.sync="subjectId" class="form-control-sm my-1" />
			</form>
		</section>
		<div class="thick" />
		<div v-for="question in questions" :key="question.hash">
			<QuestionCard :question="question" />
			<div class="thick" />
		</div>
		<div v-if="hasMore" class="text-center py-1 text-18">
			<a class="font-weight-bold" @click.prevent="fetchOlderQuestions">LOAD MORE</a>
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
export default defineComponent({
	name: 'QuestionsList',
	components: { SelectSubject, QuestionCard },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions, listener
		} = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			questions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered, subjectId
		}
	}
})
</script>
