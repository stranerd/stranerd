<template>
	<div>
		<div v-for="answer in answers" :key="answer.hash">
			<AnswerCard :question="question" :answer="answer" />
			<hr class="thick">
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { useAnswerList } from '@app/hooks/questions/answers'
import AnswerCard from '@app/components/questions/answers/AnswerListCard.vue'
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
		const { answers, error, loading, startListener, closeListener } = useAnswerList(props.question.id)
		onMounted(startListener)
		onBeforeUnmount(closeListener)
		return {
			answers, error, loading
		}
	}
})
</script>
