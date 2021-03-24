<template>
	<div class="page-content">
		<h1>Single Message</h1>
		<ChatList :user-id="userId" />
		<ChatForm :user-id="userId" session-id="" />
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import ChatList from '@app/components/sessions/chats/ChatList.vue'
import ChatForm from '@app/components/sessions/chats/ChatForm.vue'
import { useUser } from '@app/hooks/users/user'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'MessagePage',
	components: { ChatList, ChatForm },
	middleware: ['isAuthenticated',
		({ redirect, route }) => {
			const { id } = useAuth()
			const { userId } = route.params
			if (id.value === userId) redirect('/messages')
		}
	],
	setup () {
		const { userId } = useRoute().value.params
		const { user, loading, error } = useUser(userId)
		return { userId, user, loading, error }
	}
})
</script>
