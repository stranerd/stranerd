<template>
	<div :id="question.id">
		<NuxtLink class="text-grey editor-body mb-1" :to="`/questions/${question.id}`" v-html="question.body" />
		<span class="mr-2">
			<span>+{{ question.creditable }}</span>
			<Credits :size="16" />
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
	name: 'RecentQuestionsListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	}
})
</script>
