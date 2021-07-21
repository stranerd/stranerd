<template>
	<div :id="answer.id" class="d-flex flex-column gap-0-5">
		<NuxtLink class="text-18" :to="`/questions/${answer.questionId}#${answer.id}`">
			<DynamicText :text="answer.trimmedBody" />
		</NuxtLink>
		<div class="d-flex gap-0-5">
			<span>Posted {{ formatTime(answer.createdAt) }}</span>
			<img v-if="answer.best" src="@app/assets/images/icons/profile-best-answers.svg" class="icons ms-auto">
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

<style lang="scss" scoped>
	.icons {
		width: 24px;
		height: 24px;
	}
</style>
