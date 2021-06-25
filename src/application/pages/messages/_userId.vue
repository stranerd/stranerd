<template>
	<div class="flex-grow-1 d-flex flex-column">
		<PageLoading v-if="loading" />
		<template v-else-if="user">
			<div v-if="user.roles.isTutor || isTutor" class="page-content flex-grow-1 d-flex flex-column px-1">
				<ChatHead :key="user.hash + hash" :user="user" />
				<div class="thin mx-n1" />
				<ChatList :user-id="userId" class="flex-grow-1" />
				<div class="thin mx-n1" />
				<ChatForm :key="sessionId" :user-id="userId" :session-id="sessionId" />
			</div>
			<div v-else class="page-content">
				<p class="text-center mb-0 lead">
					<DisplayWarning message="You cannot chat with this person as he/she is not a nerd." />
					<NuxtLink to="/messages" style="text-decoration: underline;">
						Continue to messages
					</NuxtLink>
				</p>
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
import { useCurrentSession } from '@app/hooks/sessions/session'
import { getRandomValue } from '@utils/commons'
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
		const { isTutor } = useAuth()
		const { userId } = useRoute().value.params
		const { user, loading, error, listener } = useUser(userId)
		const { currentSession } = useCurrentSession()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const sessionId = computed({
			get: () => user.value?.currentSession && user.value?.currentSession === currentSession.value?.id ? currentSession.value?.id ?? '' : '',
			set: () => {}
		})
		const hash = computed({
			get: () => user.value?.currentSession && user.value?.currentSession === currentSession.value?.id ? getRandomValue() ?? getRandomValue() : getRandomValue(),
			set: () => {}
		})
		return { userId, user, loading, error, sessionId, hash, isTutor }
	}
})
</script>
