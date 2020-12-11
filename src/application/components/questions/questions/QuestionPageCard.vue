<template>
	<div>
		<div class="d-flex align-items-start mb-1">
			<img :src="question.user.image.link" alt="" class="profile-image">
			<div class="mx-1">
				<span class="d-block text-red font-weight-bold text-wrap">
					{{ question.user.name }}
				</span>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ time }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ml-auto">
				<img src="@/assets/images/icons/credits.svg" width="20" height="20" alt="" style="z-index:1;">
				<span class="rounded-pill ml-n2 pr-1 border border-grey small" style="padding-left: 1.25rem;">
					+{{ question.credits }}
				</span>
			</div>
		</div>
		<div>
			<p class="mb-1" v-html="question.body" />
			<span v-if="question.attachments.length">
				<span>{{ question.attachments.length }}</span>
				<i class="fas fa-paperclip" />
			</span>
		</div>
		<hr class="thick">
		<div class="d-flex justify-content-center my-1">
			<button v-if="!question.isAnswered" class="btn rounded-pill py-1 px-4 btn-accent text-white" @click="openAnswerModal">
				Add Answer
			</button>
			<span v-else class="mb-0 h5 text-accent">
				Already Answered
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
	name: 'QuestionPageCard',
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
