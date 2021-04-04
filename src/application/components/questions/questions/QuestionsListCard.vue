<template>
	<div :id="question.id" class="my-2">
		<div class="d-flex align-items-center mb-1">
			<NuxtLink :to="`/users/${question.userId}`">
				<Avatar :src="question.avatar" :size="50" />
			</NuxtLink>
			<div class="mx-1">
				<NuxtLink :to="`/users/${question.userId}`" class="d-block text-wrap">
					<span class="font-weight-bold">{{ question.userName }}</span>
				</NuxtLink>
				<span class="small text-wrap">
					{{ subject ? subject.name : 'Subject' }}
					|
					{{ formatTime(question.createdAt) }}
				</span>
			</div>
			<span class="ml-auto">
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 20px; height: 20px;">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
			</span>
			<i v-if="question.isAnswered" class="fas fa-check text-green fa-2x ml-1" />
		</div>
		<NuxtLink class="editor-body mb-1" :to="`/questions/${question.id}`" v-html="question.body" />
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
import { formatNumber, pluralize } from '@utils/numbers'
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
