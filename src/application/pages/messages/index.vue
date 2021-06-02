<template>
	<div>
		<div class="page-content">
			<p v-if="meta.length === 0" class="text-center align-self-center my-auto">
				No chats found. Go message a nerd
			</p>
			<div v-for="chat in meta" :key="chat.id">
				<UserChatCard :meta="chat" />
				<div class="thick mx-n1" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import UserChatCard from '@app/components/sessions/chats/UserChatCard.vue'
import { useChatsList } from '@app/hooks/sessions/chats-list'
export default defineComponent({
	name: 'MessagesPage',
	components: { UserChatCard },
	middleware: ['isAuthenticated'],
	setup () {
		const { meta, listener } = useChatsList()
		onMounted(() => {
			if (!listener?.value) listener?.startListener()
		})
		return { meta }
	}
})
</script>
