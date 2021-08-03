<template>
	<QuestionsList :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import QuestionsList from '@app/components/questions/questions/UserQuestionsList.vue'
export default defineComponent({
	name: 'UserQuestionsPage',
	components: { QuestionsList },
	setup () {
		const { userId } = useRoute().value.params
		return { userId }
	}
})
</script>
