<template>
	<div class="flex-grow-1 d-flex flex-column">
		<PageLoading v-if="loading" />
		<div v-else-if="user" class="flex-grow-1 d-flex flex-column bg-white b-rad">
			<ChatHead :key="hash" :user="user" />
			<ChatList :user-id="userId" class="flex-grow-1" />
			<ChatForm :key="sessionId" :user-id="userId" :session-id="sessionId" />
		</div>
		<DisplayError v-else error="No such user exists!" />
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
	layout: 'chat',
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

<style lang="scss" scoped>
	.b-rad {
		border-radius: 12px;
	}
</style>
