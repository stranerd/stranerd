<template>
	<div :id="question.id">
		<NuxtLink class="text-18 mb-1 editor-body" :to="`/questions/${question.id}`" v-html="question.body" />
		<div class="d-flex">
			<span class="text-wrap mr-auto">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ formatTime(question.createdAt) }}
			</span>
			<span class="ml-1">
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 24px; height: 24px;">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
			</span>
			<span v-if="question.attachments.length" class="ml-1">
				<span>{{ formatNumber(question.attachments.length) }}</span>
				<i class="fas fa-paperclip" />
			</span>
			<i v-if="question.isAnswered" class="fas fa-check text-green fa-2x ml-1" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { formatNumber, pluralize } from '@utils/numbers'
import { formatTime } from '@utils/dates'
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
		return { subject, formatTime, formatNumber, pluralize }
	}
})
</script>
