<template>
	<div class="col-12 d-flex flex-column">
		<div class=" mb-2">
			<h2 class="headerStyle">
				Answers
			</h2>
		</div>
		<div class="py-2 d-flex flex-column">
			<each-answer />
		</div>
		<!-- <AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		<DisplayWarning v-if="!loading && !error && answers.length === 0" message="This question doesn't have any answers yet." />
		<DisplayError :error="error" /> -->
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
// import { useAnswerList } from '@app/hooks/questions/answers'
// import AnswerCard from '@app/components/questions/answers/AnswersListCard.vue'
import EachAnswer from '@app/components/questions/answers/EachAnswer.vue'
import { QuestionEntity } from '@modules/questions'
export default defineComponent({
	name: 'AnswersList',
	components: {
		// AnswerCard,
		EachAnswer
	},
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup () {
		// const { answers, error, loading, listener } = useAnswerList(props.question.id)
		// onMounted(listener.startListener)
		// onBeforeUnmount(listener.closeListener)
		// return {
		// 	answers, error, loading
		// }
	}
})
</script>
<style lang="scss" scoped>
.headerStyle {
		font-weight: bold;
		text-transform: none;
		color: $color-text-main;
	}
</style>
