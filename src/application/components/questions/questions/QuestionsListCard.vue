<template>
	<div :id="question.id" class="my-1">
		<div class="d-flex align-items-center mb-0-5 gap-0-5">
			<NuxtLink :to="`/users/${question.userId}`">
				<Avatar :src="question.avatar" :size="50" />
			</NuxtLink>
			<div>
				<NuxtLink :to="`/users/${question.userId}`" class="d-block text-wrap">
					<span class="fw-bold">{{ question.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ formatTime(question.createdAt) }}
				</span>
			</div>
			<span class="ms-auto">
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 20px; height: 20px;">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
			</span>
			<i v-if="question.isAnswered" class="fas fa-check text-success fa-2x ms-0-5" />
		</div>
		<NuxtLink class="d-block mb-0-5" :to="`/questions/${question.id}`">
			{{ question.trimmedBody }}
		</NuxtLink>
		<NuxtLink v-if="question.attachments.length" :to="`/questions/${question.id}`">
			<span>{{ formatNumber(question.attachments.length) }}</span>
			<i class="fas fa-paperclip" />
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
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
		return { id, subject, formatTime, formatNumber, pluralize }
	}
})
</script>
