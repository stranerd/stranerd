<template>
	<div :id="question.id" class="questionStyle">
		<NuxtLink class="d-block" :to="`/questions/${question.id}`">
			{{ question.trimmedBody }}
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { formatNumber } from '@utils/commons'
export default defineComponent({
	name: 'RecentQuestionsListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>

<style lang="scss" scoped>
	.questionStyle {
		font-size: 16px;
		color: $color-text-sub;
		border-bottom: 1px solid $color-line;
	}
</style>
