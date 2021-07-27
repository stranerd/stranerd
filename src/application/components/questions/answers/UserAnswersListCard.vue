<template>
	<div :id="answer.id" class="d-flex flex-column gap-0-5 py-1 border-bottom border-line">
		<NuxtLink class="text-18" :to="`/questions/${answer.questionId}#${answer.id}`">
			<DynamicText>
				{{ answer.trimmedBody }}
			</DynamicText>
		</NuxtLink>
		<div class="d-flex align-items-center gap-0-5">
			<DynamicText class="me-auto">
				Posted {{ formatTime(answer.createdAt) }}
			</DynamicText>
			<img v-if="answer.best" src="@app/assets/images/icons/profile-best-answers.svg" class="sub-icons">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'UserAnswerListCard',
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>
