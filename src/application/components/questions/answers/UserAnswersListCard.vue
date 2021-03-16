<template>
	<div :id="answer.id">
		<NuxtLink class="text-18 editor-body mb-1" :to="`/questions/${answer.questionId}#${answer.id}`" v-html="answer.body" />
		<div class="d-flex">
			<span class="text-wrap mr-auto">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ time }}
			</span>
			<span class="ml-1">
				<span>+{{ formatNumber(answer.coins) }}</span>
				<Coins :size="16" />
			</span>
			<span v-if="answer.attachments.length" class="ml-1">
				<span>{{ answer.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<span v-if="answer.best" class="ml-1 text-green">
				<span>Best</span>
				<i class="fas fa-check" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
import { useSubject } from '@app/hooks/questions/subjects'
import { formatNumber } from '@utils/numbers'
export default defineComponent({
	name: 'UserAnswerListCard',
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},
	setup (props) {
		const { subject } = useSubject(props.answer.subjectId)
		const { time, startTimer, stopTimer } = useTimeDifference(props.answer.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { subject, time, formatNumber }
	}
})
</script>
