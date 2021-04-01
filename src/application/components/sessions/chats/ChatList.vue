<template>
	<div class="d-flex flex-column">
		<p v-if="chats.length === 0" class="text-center mb-0 my-auto">
			No messages found. Send a message now
		</p>
		<div v-for="session in chats" :key="session.hash">
			<ChatListCard v-for="chat in session.chats" :key="chat.hash" :chat="chat" />
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useChats } from '@app/hooks/sessions/chats'
import ChatListCard from '@app/components/sessions/chats/ChatListCard.vue'
export default defineComponent({
	name: 'ChatList',
	components: { ChatListCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { chats, listener, fetchOlderChats, hasMore, error, loading } = useChats(props.userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { chats, error, loading, fetchOlderChats, hasMore }
	}
})
</script>
