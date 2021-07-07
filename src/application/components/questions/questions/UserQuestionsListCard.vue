<template>
	<div :id="question.id">
		<NuxtLink class="text-18 d-block mb-0-5" :to="`/questions/${question.id}`">
			{{ question.trimmedBody }}
		</NuxtLink>
		<div class="d-flex gap-0-5">
			<span class="text-wrap me-auto">
				{{ subject ? subject.name : 'Subject' }}
				|
				{{ formatTime(question.createdAt) }}
			</span>
			<span>
				<img src="@app/assets/images/icons/answers.svg" alt="" style="width: 24px; height: 24px;">
				<span>{{ formatNumber(question.answers) }} {{ pluralize(question.answers, 'answer', 'answers') }}</span>
			</span>
			<i v-if="question.isAnswered" class="fas fa-check text-success fa-2x" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { useSubject } from '@app/hooks/questions/subjects'
import { formatNumber, pluralize } from '@utils/commons'
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
