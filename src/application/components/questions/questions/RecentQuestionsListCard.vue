<template>
	<div :id="question.id">
		<NuxtLink class="text-18 mb-1" :to="`/questions/${question.id}`">
			{{ question.trimmedBody }}
		</NuxtLink>
		<span v-if="question.attachments.length">
			<span>{{ formatNumber(question.attachments.length) }}</span>
			<i class="fas fa-paperclip" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { formatNumber } from '@utils/commons'
export default defineComponent({
	name: 'RecentQuestionsListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>
