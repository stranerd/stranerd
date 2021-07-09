<template>
	<div class="flex-grow-1 d-flex flex-column">
		<PageLoading v-if="loading" />
		<template v-else-if="user">
			<div class="page-content flex-grow-1 d-flex flex-column px-1">
				<ChatHead :key="hash" :user="user" />
				<div class="thin mx-n1" />
				<ChatList :user-id="userId" class="flex-grow-1" />
				<div class="thin mx-n1" />
				<ChatForm :key="hash" :user-id="userId" :session-id="sessionId" />
			</div>
		</template>
		<div v-else class="page-content">
			<DisplayError error="No such user exists!" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, useRoute } from '@nuxtjs/composition-api'
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
		const { currentSessionId } = useAuth()
		const { userId } = useRoute().value.params
		const { user, loading, error, listener } = useUser(userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const sessionId = computed({
			get: () => currentSessionId.value && user.value?.currentSession === currentSessionId.value
				? currentSessionId.value
				: '',
			set: () => {}
		})
		const hash = computed({
			get: () => user.value?.hash + sessionId.value,
			set: () => {}
		})
		return { userId, user, loading, error, sessionId, hash }
	}
})
</script>
