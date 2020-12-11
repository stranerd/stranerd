<template>
	<div :id="question.id">
		<BaseLink class="text-grey" :to="`/questions/${question.id}`" :root="true">
			<p class="mb-1" v-html="question.body" />
		</BaseLink>
		<span class="mr-2">
			<span>+{{ question.creditable }}</span>
			<img src="@/assets/images/icons/credits.svg" width="16" height="16" alt="">
		</span>
		<span v-if="question.attachments.length">
			<span>{{ question.attachments.length }}</span>
			<i class="fas fa-paperclip" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
export default defineComponent({
	name: 'QuestionsCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	}
})
</script>
