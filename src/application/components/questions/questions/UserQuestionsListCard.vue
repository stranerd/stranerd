<template>
	<div :id="question.id">
		<NuxtLink class="text-18 mb-1 editor-body" :to="`/questions/${question.id}`" v-html="question.body" />
		<div class="d-flex">
			<span class="text-wrap">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ time }}
			</span>
			<span class="ml-auto">
				<span>{{ formatNumber(question.credits) }}</span>
				<Credits :size="16" />
			</span>
			<span v-if="question.attachments.length" class="ml-1">
				<span>{{ question.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTimeDifference } from '@app/hooks/core/dates'
import { formatNumber } from '@app/hooks/core/numbers'
export default defineComponent({
	name: 'UserQuestionsListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { subject } = useSubject(props.question.subjectId)
		const { time, startTimer, stopTimer } = useTimeDifference(props.question.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { subject, time, formatNumber }
	}
})
</script>
