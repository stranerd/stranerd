<template>
	<NuxtLink :to="`/messages/${user.id}`" class="gap-1">
		<Avatar :src="user.avatar" :size="60" />
		<div class="flex-grow-1 text-truncate">
			<div class="d-flex justify-content-between gap-1">
				<span class="fw-bold lead d-inline-block">{{ user.name.fullName }}</span>
				<span v-if="chat" class="ms-auto">{{ formatTime(chat.createdAt) }}</span>
			</div>
			<p v-if="chat" class="mb-0 text-truncate">
				<i v-if="chat.isMedia" class="fas fa-paperclip me-half" />
				{{ chat.isMedia ? chat.media.name : chat.content }}
			</p>
		</div>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { UserBio } from '@modules/users'
import { useChatCard } from '@app/hooks/sessions/chats-list'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'UserChatCard',
	props: {
		user: {
			type: Object as PropType<UserBio & { id: string }>,
			required: true
		}
	},
	setup (props) {
		const { chat, listener } = useChatCard(props.user.id)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { chat, formatTime }
	}
})
</script>

<style lang="scss" scoped>
a {
	padding: 0.5rem;
	display: flex;
	align-items: flex-start;
	border-radius: 1rem;
}
a:hover {
	transform: none;
	font-size: inherit;
	color: inherit;
	text-decoration: none;
	background: darken($color-light-blue, 2);
}
</style>
