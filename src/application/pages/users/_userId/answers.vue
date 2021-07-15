<template>
	<AnswersList :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import AnswersList from '@app/components/questions/answers/UserAnswersList.vue'
export default defineComponent({
	name: 'UserAnswersPage',
	components: { AnswersList },
	layout: 'profile',
	setup () {
		const { userId } = useRoute().value.params
		return { userId }
	}
})
</script>
