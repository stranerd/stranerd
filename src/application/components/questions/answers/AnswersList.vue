<template>
	<div>
		<h2 class="fw-bold mb-0">
			Answers
		</h2>
		<div class="thick" />
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		<DisplayWarning v-if="!loading && !error && answers.length === 0" message="This question doesn't have any answers yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { useAnswerList } from '@app/hooks/questions/answers'
import AnswerCard from '@app/components/questions/answers/AnswersListCard.vue'
import { QuestionEntity } from '@modules/questions'
export default defineComponent({
	name: 'AnswersList',
	components: {
		AnswerCard
	},
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { answers, error, loading, listener } = useAnswerList(props.question.id)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			answers, error, loading
		}
	}
})
</script>
