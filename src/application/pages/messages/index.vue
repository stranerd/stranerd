<template>
	<div>
		<div class="page-content">
			<p v-if="chats.length === 0" class="text-center align-self-center my-auto">
				No chats found. Go message a user
			</p>
			<div v-for="user in chats" :key="user.id">
				<UserChatCard :user="user" />
				<div class="thick mx-n1" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserChatCard from '@app/components/sessions/chats/UserChatCard.vue'
import { useChatList } from '@app/hooks/sessions/chats-list'
export default defineComponent({
	name: 'MessagesPage',
	components: { UserChatCard },
	middleware: ['isAuthenticated'],
	setup () {
		const { chats } = useChatList()
		return { chats }
	}
})
</script>
