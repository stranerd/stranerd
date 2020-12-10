<template>
	<div>
		<p>{{ question }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
export default defineComponent({
	name: 'QuestionPageCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	}
})
</script>
