<template>
	<div class="flex-grow-1 d-flex flex-column">
		<PageLoading v-if="loading" />
		<div v-else-if="user" class="page-content flex-grow-1 d-flex flex-column px-2">
			<ChatHead :key="user.hash" :user="user" />
			<div class="thin mx-n2" />
			<ChatList :user-id="userId" class="flex-grow-1" />
			<div class="thin mx-n2" />
			<ChatForm :user-id="userId" session-id="" />
		</div>
		<div v-else class="page-content">
			<DisplayError error="No such user exists!" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, useRoute } from '@nuxtjs/composition-api'
import ChatHead from '@app/components/sessions/chats/ChatHead.vue'
import ChatList from '@app/components/sessions/chats/ChatList.vue'
import ChatForm from '@app/components/sessions/chats/ChatForm.vue'
import { useUser } from '@app/hooks/users/user'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'MessagePage',
	components: { ChatHead, ChatList, ChatForm },
	middleware: ['isAuthenticated',
		({ redirect, route }) => {
			const { id } = useAuth()
			const { userId } = route.params
			if (id.value === userId) redirect('/messages')
		}
	],
	setup () {
		const { userId } = useRoute().value.params
		const { user, loading, error, listener } = useUser(userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { userId, user, loading, error }
	}
})
</script>
