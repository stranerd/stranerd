<template>
	<UserAnswersList :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import UserAnswersList from '@app/components/questions/answers/UserAnswersList.vue'
export default defineComponent({
	name: 'UserAnswersPage',
	components: { UserAnswersList },
	layout: 'user',
	setup () {
		const { route } = useContext()
		const { userId } = route.value.params
		return { userId }
	}
})
</script>
