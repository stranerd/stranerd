<template>
	<div>
		{{ answer }}
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
export default defineComponent({
	name: 'AnswerListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		},
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	}
})
</script>
