<template>
	<div>
		<section class="d-flex flex-column flex-md-row text-center">
			<h1 class="text-grey">
				Questions
			</h1>
			<form class="form-inline mx-auto mr-md-0 ml-md-auto">
				<select class="form-control form-control-sm rounded-pill mr-1 my-1">
					<option disabled :value="null">
						Please
					</option>
					<option v-for="(option, index) in ['All', 'Answered', 'Unanswered']" :key="index" :value="option">
						{{ option }}
					</option>
				</select>
				<select class="form-control form-control-sm rounded-pill my-1">
					<option disabled :value="null">
						Please
					</option>
					<option v-for="(option, index) in ['All', 'Answered', 'Unanswered']" :key="index" :value="option">
						{{ option }}
					</option>
				</select>
			</form>
		</section>
		<hr class="thick bg-light-grey">
		<div>
			<div v-for="question in questions" :key="question.hash">
				<QuestionCard :question="question" />
				<hr class="thick bg-light-grey">
			</div>
			<div v-if="hasMore" class="text-center py-1 text-18">
				<a class="font-weight-bold text-grey" @click.prevent="fetchOlderQuestions">LOAD MORE</a>
			</div>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/QuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionCard },
	setup () {
		const { questions, error, loading, hasMore, fetchOlderQuestions, startQuestionListener, closeQuestionListener } = useQuestionList()
		onMounted(startQuestionListener)
		onBeforeUnmount(closeQuestionListener)
		return {
			questions, error, loading, hasMore, fetchOlderQuestions
		}
	}
})
</script>
