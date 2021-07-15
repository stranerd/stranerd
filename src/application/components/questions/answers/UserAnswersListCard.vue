<template>
	<div :id="answer.id" class="d-flex flex-row col-12 px-1 py-1 align-items-center">
		<NuxtLink class="text-18 make-fit" :to="`/questions/${answer.questionId}#${answer.id}`">
			{{ answer.trimmedBody }}
		</NuxtLink>
		<div class="d-flex pad">
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

	.make-fit {
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.pad {
		padding-left: 4px;
		margin-left: auto;
	}
</style>
