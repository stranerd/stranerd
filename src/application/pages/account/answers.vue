<template>
	<UserAnswersList class="page-content" :user-id="id" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserAnswersList from '@app/components/questions/answers/UserAnswersList.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AccountAnswersPage',
	components: { UserAnswersList },
	layout: 'account',
	setup () {
		const { id } = useAuth()
		return { id }
	}
})
</script>
