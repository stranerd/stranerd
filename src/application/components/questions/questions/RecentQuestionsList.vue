<template>
	<div>
		<div v-for="rQuestion in questions" :key="rQuestion.hash">
			<QuestionCard :question="rQuestion" />
			<hr class="thin">
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onBeforeUnmount, PropType } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/RecentQuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
import { QuestionEntity } from '@modules/questions'
export default defineComponent({
	name: 'RecentQuestionsList',
	components: { QuestionCard },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const {
			filteredQuestions, error, loading,
			answeredChoices, answered, subjectId,
			startQuestionListener, closeQuestionListener
		} = useQuestionList()
		onMounted(startQuestionListener)
		onBeforeUnmount(closeQuestionListener)
		const recentQuestions = computed(() => filteredQuestions.value
			.filter((q) => q.id !== props.question?.id)
			.slice(0, 5))
		return {
			questions: recentQuestions, error, loading,
			answeredChoices, answered, subjectId
		}
	}
})
</script>
