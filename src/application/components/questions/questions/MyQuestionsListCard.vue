<template>
	<div :id="question.id">
		<BaseLink class="text-18" :to="`/questions/${question.id}`" :root="true">
			<p class="mb-1" v-html="question.body" />
		</BaseLink>
		<div class="d-flex">
			<span class="text-wrap">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ time }}
			</span>
			<span class="ml-auto">
				<span>{{ question.credits }}</span>
				<img src="@/assets/images/icons/credits.svg" width="16" height="16" alt="">
			</span>
			<span v-if="question.attachments.length" class="mr-2">
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
import { openAnswerModal } from '@app/hooks/questions/answers'
export default defineComponent({
	name: 'MyQuestionsListCard',
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
		return {
			subject, time,
			openAnswerModal: () => openAnswerModal(props.question)
		}
	}
})
</script>
