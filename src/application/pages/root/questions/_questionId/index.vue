<template>
	<div>
		<QuestionPageCard v-if="question" :question="question" />
		<div v-else>
			<p>Question doesn't exist</p>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useContext } from '@nuxtjs/composition-api'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import { useQuestion } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'RootQuestionPage',
	components: {
		QuestionPageCard
	},
	layout: 'rootQuestionsSingle',
	middleware: [],
	setup () {
		const { questionId } = useContext().route.value.params
		const { question, error, loading, startListener, closeListener } = useQuestion(questionId)
		onMounted(startListener)
		onBeforeUnmount(closeListener)
		return {
			question, error, loading
		}
	}
})
</script>
