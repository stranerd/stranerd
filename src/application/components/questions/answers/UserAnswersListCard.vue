<template>
	<div :id="answer.id">
		<NuxtLink class="text-18 editor-body mb-1" :to="`/questions/${answer.questionId}#${answer.id}`" v-html="answer.body" />
		<div class="d-flex">
			<span class="text-wrap me-auto">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ formatTime(answer.createdAt) }}
			</span>
			<span class="ms-1">
				<span>+{{ formatNumber(answer.coins) }}</span>
				<Coins :size="16" />
			</span>
			<span v-if="answer.attachments.length" class="ms-1">
				<span>{{ answer.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<span v-if="answer.best" class="ms-1 text-green">
				<span>Best</span>
				<i class="fas fa-check" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { formatNumber } from '@utils/numbers'
import { formatTime } from '@utils/dates'
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
		return { subject, formatTime, formatNumber }
	}
})
</script>
