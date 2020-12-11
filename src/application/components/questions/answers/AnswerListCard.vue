<template>
	<div :id="answer.id">
		{{ answer }}
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { useQuestionList } from '@app/hooks/questions/questions'
export default defineComponent({
	name: 'AnswerListCard',
	props: {
		questionId: {
			required: true,
			type: String
		},
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},
	setup (props) {
		const { questions } = useQuestionList()
		const question = computed({
			get: () => questions.value.find((q) => q.id === props.questionId) ?? null,
			set: () => {}
		})
		return { question }
	}
})
</script>
