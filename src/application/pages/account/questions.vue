<template>
	<UserQuestionsList class="page-content" :user-id="id" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserQuestionsList from '@app/components/questions/questions/UserQuestionsList.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AccountQuestionsPage',
	components: { UserQuestionsList },
	layout: 'dashboard',
	setup () {
		const { id } = useAuth()
		return { id }
	}
})
</script>
