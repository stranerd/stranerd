<template>
	<div class="d-flex flex-column bg-white b-rad">
		<div class="head">
			<h1>Inbox</h1>
		</div>
		<span v-if="meta.length === 0" class="text-center align-self-center my-auto">
			No chats found. Go message a nerd
		</span>
		<UserChatCard v-for="chat in meta" :key="chat.id" :meta="chat" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import UserChatCard from '@app/components/sessions/chats/UserChatCard.vue'
import { useChatsList } from '@app/hooks/sessions/chats-list'
export default defineComponent({
	name: 'ContactList',
	components: { UserChatCard },
	setup () {
		const { meta, listener } = useChatsList()
		onMounted(() => {
			if (!listener.isRunning) listener.startListener()
		})
		return { meta }
	}
})
</script>

<style lang="scss" scoped>
	.b-rad {
		border-radius: 12px;
		@media (min-width: $lg) { border-radius: 12px 0 0 12px; }
	}

	.head {
		display: flex;
		align-items: center;
		padding: 1.5rem 2rem;
		background: $color-line;
		border-radius: 12px 12px 0 0;
		@media (min-width: $lg) { border-radius: 12px 0 0 0; }

		h1 {
			font-size: 1.5rem;
			margin: 0;
		}
	}
</style>
