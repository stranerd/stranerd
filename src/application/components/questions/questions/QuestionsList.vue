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
				<select v-model="subjectId" class="form-control form-control-sm my-1">
					<option value="">
						All Subjects
					</option>
					<option v-for="subject in subjects" :key="subject.hash" :value="subject.id">
						{{ subject.name }}
					</option>
				</select>
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
		<DisplayError :error="subError" />
		<PageLoading v-if="loading" />
		<PageLoading v-if="subLoading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/QuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
import { useSubjectList } from '@app/hooks/questions/subjects'
export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionCard },
	setup () {
		const { subjects, error: subError, loading: subLoading } = useSubjectList()
		const {
			filteredQuestions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions, listener
		} = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			subjects, subError, subLoading,
			questions: filteredQuestions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered, subjectId
		}
	}
})
</script>
