<template>
	<div class="flex-grow-1 d-flex flex-column">
		<PageLoading v-if="loading" />
		<div v-else-if="user" class="flex-grow-1 d-flex flex-column bg-white">
			<ChatHead :key="hash" :user="user" class="px-1 px-md-2" />
			<ChatList :user-id="userId" class="flex-grow-1 px-1 px-md-2" />
			<TutorSessionOption v-if="requestedSession" :session="requestedSession" class="px-1 px-md-2" />
			<StudentWaitingSession v-if="requestingSession" :session="requestingSession" class="px-1 px-md-2" />
			<ChatForm v-if="sessionId" :user-id="userId" :session-id="sessionId" class="px-1 px-md-2" />
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
		const { currentSessionId, user: authUser } = useAuth()
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
			get: () => authUser.value?.hash ?? '' + user.value?.hash ?? '' + sessionId.value,
			set: () => {}
		})
		const requestedSession = hasRequestedSessionWith(props.userId)
		const requestingSession = isRequestingSessionWith(props.userId)
		return { user, loading, error, sessionId, hash, requestedSession, requestingSession }
	}
})
</script>
