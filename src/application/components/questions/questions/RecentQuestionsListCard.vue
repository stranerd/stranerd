<template>
	<div :id="question.id">
		<NuxtLink class="editor-body mb-1" :to="`/questions/${question.id}`" v-html="question.body" />
		<span v-if="question.attachments.length">
			<span>{{ question.attachments.length }}</span>
			<i class="fas fa-paperclip" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { formatNumber } from '@app/hooks/core/numbers'
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
