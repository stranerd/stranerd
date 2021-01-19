<template>
	<UserQuestionsList class="page-content" :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import UserQuestionsList from '@app/components/questions/questions/UserQuestionsList.vue'
export default defineComponent({
	name: 'UserQuestionsPage',
	components: { UserQuestionsList },
	layout: 'user',
	setup () {
		const { route } = useContext()
		const { userId } = route.value.params
		return { userId }
	}
})
</script>
