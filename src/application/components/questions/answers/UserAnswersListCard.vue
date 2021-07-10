<template>
	<div class=" d-flex flex-row pt-1 pb-1 wrapper" style="align-items:center;">
		<div class="answer-body">
			<span>The answer is 16m/s.</span>
		</div>
		<div class="d-flex align-items-center justify-content-between" style="margin-left:auto;">
			<div class="d-flex align-items-center">
				<i class="fas fa-check-circle" style="color:#00F332;font-size:24px;" />
			</div>
		</div>
	</div>
	<!-- <div :id="answer.id">
		<NuxtLink class="text-18 d-block mb-0-5" :to="`/questions/${answer.questionId}#${answer.id}`">
			{{ answer.trimmedBody }}
		</NuxtLink>
		<div class="d-flex gap-0-5">
			<span class="text-wrap me-auto">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ formatTime(answer.createdAt) }}
			</span>
			<span>
				<span>+{{ formatNumber(answer.coins) }}</span>
				<Coins :size="16" />
			</span>
			<span v-if="answer.best" class="text-success">
				<span>Best</span>
				<i class="fas fa-check" />
			</span>
		</div>
	</div> -->
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
// import { useSubject } from '@app/hooks/questions/subjects'
// import { formatNumber } from '@utils/commons'
// import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'UserAnswerListCard',
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	}
	// setup (props) {
	// 	const { subject } = useSubject(props.answer.subjectId)
	// 	return { subject, formatTime, formatNumber }
	// }
})
</script>
<style lang="scss" scoped>
	.answer-body {
		span {
			margin: 32px 0;
			font-size: 16px;
		}
	}
	.wrapper {
		border-bottom: 1px solid $color-line;
	}
</style>
