<template>
	<div class="flex-grow-1 d-flex flex-column">
		<PageLoading v-if="loading" />
		<div v-else-if="user" class="flex-grow-1 d-flex flex-column bg-white">
			<ChatHead :key="hash" :user="user" />
			<ChatList :user-id="userId" class="flex-grow-1" />
			<TutorSessionOption v-if="requestedSession" :session="requestedSession" />
			<StudentWaitingSession v-if="requestingSession" :session="requestingSession" />
			<ChatForm v-if="sessionId" :user-id="userId" :session-id="sessionId" />
		</div>
		<DisplayError v-else error="No such user exists!" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import ChatHead from '@app/components/sessions/chats/ChatHead.vue'
import ChatList from '@app/components/sessions/chats/ChatList.vue'
import ChatForm from '@app/components/sessions/chats/ChatForm.vue'
import TutorSessionOption from '@app/components/sessions/chats/TutorSessionOption.vue'
import StudentWaitingSession from '@app/components/sessions/chats/StudentWaitingSession.vue'
import { useUser } from '@app/hooks/users/user'
import { useAuth } from '@app/hooks/auth/auth'
import { hasRequestedSessionWith, isRequestingSessionWith } from '@app/hooks/sessions/session'
export default defineComponent({
	name: 'ContactListMessages',
	components: { ChatHead, ChatList, ChatForm, TutorSessionOption, StudentWaitingSession },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { currentSessionId } = useAuth()
		const { user, loading, error, listener } = useUser(props.userId)
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
		const requestedSession = hasRequestedSessionWith(props.userId)
		const requestingSession = isRequestingSessionWith(props.userId)
		return { user, loading, error, sessionId, hash, requestedSession, requestingSession }
	}
})
</script>
