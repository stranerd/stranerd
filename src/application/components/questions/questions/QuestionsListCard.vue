<template>
	<div :id="question.id" class="my-2">
		<div class="d-flex align-items-center mb-1">
			<NuxtLink :to="`/users/${question.userId}`">
				<img :src="question.avatar" alt="" class="profile-image" style="width: 60px; height: 60px;">
			</NuxtLink>
			<div class="mx-1">
				<NuxtLink :to="`/users/${question.userId}`" class="d-block text-wrap">
					<span class="font-weight-bold">{{ question.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ time }}
				</span>
			</div>
			<span class="ml-auto">
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 20px; height: 20px;">
				<span>{{ question.answers }} answers</span>
			</span>
		</div>
		<NuxtLink class="text-grey editor-body mb-1" :to="`/questions/${question.id}`" v-html="question.body" />
		<NuxtLink v-if="question.attachments.length" :to="`/questions/${question.id}`">
			<span>{{ question.attachments.length }}</span>
			<i class="fas fa-paperclip" />
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTimeDifference } from '@app/hooks/core/dates'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@app/hooks/core/numbers'
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
		return { id, subject, time, formatNumber }
	}
})
</script>
