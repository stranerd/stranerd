<template>
	<div class="page-content">
		<QuestionsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
export default defineComponent({
	name: 'QuestionsPage',
	components: { QuestionsList	},
	layout: 'dashboard'
})
</script>
