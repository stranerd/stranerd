<template>
	<div :id="answer.id" class="p-1">
		<NuxtLink class="text-18 d-block mb-0-5" :to="`/questions/${answer.questionId}#${answer.id}`">
			{{ answer.trimmedBody }}
		</NuxtLink>
		<div class="d-flex gap-0-5">
			<img v-if="answer.best" src="@app/assets/images/icons/profile-best-answers.svg" class="icons ms-auto">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerEntity } from '@modules/questions'
export default defineComponent({
	name: 'UserAnswerListCard',
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	}
})
</script>

<style lang="scss" scoped>
	.icons {
		width: 24px;
		height: 24px;
	}
</style>
