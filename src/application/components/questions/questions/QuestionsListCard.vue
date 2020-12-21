<template>
	<div :id="question.id">
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
				<Credits :size="20" style="z-index:1;" />
				<span class="rounded-pill ml-n2 pr-1 border border-grey small" style="padding-left: 1.25rem;">
					+{{ question.creditable }}
				</span>
			</div>
			<NuxtLink v-if="question.userId !== id && !question.isAnswered" class="btn btn-sm rounded-pill py-0 px-1 btn-accent ml-1 text-white" :to="`/questions/${question.id}#answer`">
				Answer
			</NuxtLink>
		</div>
		<NuxtLink class="text-grey" :to="`/questions/${question.id}`">
			<p class="mb-1" v-html="question.body" />
		</NuxtLink>
		<span v-if="question.attachments.length">
			<span>{{ question.attachments.length }}</span>
			<i class="fas fa-paperclip" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTimeDifference } from '@app/hooks/core/dates'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'QuestionsListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { subject } = useSubject(props.question.subjectId)
		const { time, startTimer, stopTimer } = useTimeDifference(props.question.createdAt)
		onMounted(startTimer)
		onBeforeUnmount(stopTimer)
		return { id, subject, time }
	}
})
</script>
