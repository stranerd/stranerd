<template>
	<div class="text-grey">
		<div class="d-flex align-items-start">
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
			<button class="btn btn-sm rounded-pill py-0 px-1 btn-accent ml-1 text-white">
				Answer
			</button>
		</div>
		<BaseLink class="text-grey" :to="`/questions/${question.id}`" :root="true">
			{{ question.body }}
		</BaseLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTimeDifference } from '@app/hooks/core/dates'

export default defineComponent({
	name: 'QuestionsCard',
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
		return { subject, time }
	}
})
</script>
