<template>
	<div :id="answer.id">
		<NuxtLink class="text-18" :to="`/questions/${answer.questionId}#${answer.id}`">
			<p class="mb-1" v-html="answer.body" />
		</NuxtLink>
		<div class="d-flex">
			<span class="text-wrap">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ time }}
			</span>
			<span class="ml-auto">
				<span>+{{ answer.credits }}</span>
				<Credits :size="16" />
			</span>
			<span v-if="answer.attachments.length" class="mr-2">
				<span>{{ answer.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { useTimeDifference } from '@app/hooks/core/dates'
import { useSubject } from '@app/hooks/questions/subjects'
export default defineComponent({
	name: 'MyAnswerListCard',
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
		return { subject, time }
	}
})
</script>
