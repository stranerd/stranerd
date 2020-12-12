<template>
	<div>
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" />
		<DisplayError v-if="answers.length === 0" error="This question doesn't have any answers yet." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useAnswerList } from '@app/hooks/questions/answers'
import AnswerCard from '@app/components/questions/answers/AnswersListCard.vue'
export default defineComponent({
	name: 'AnswersList',
	components: {
		AnswerCard
	},
	props: {
		questionId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { answers, error, loading, listener } = useAnswerList(props.questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			answers, error, loading
		}
	}
})
</script>
