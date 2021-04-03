<template>
	<div class="page-content">
		<div v-for="user in chats" :key="user.id">
			<UserChatCard :user="user" />
			<div class="thick mx-n2" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import UserChatCard from '@app/components/sessions/chats/UserChatCard.vue'
export default defineComponent({
	name: 'MessagesPage',
	components: { UserChatCard },
	middleware: ['isAuthenticated'],
	setup () {
		const { chats } = useAuth()
		return { chats }
	}
})
</script>
