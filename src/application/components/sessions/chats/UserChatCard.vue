<template>
	<NuxtLink :to="`/messages/${user.id}`">
		<Avatar :src="user.avatar" :size="60" />
		<div class="ml-1 mr-auto d-flex flex-column">
			<span class="font-weight-bold lead">{{ user.name.fullName }}</span>
			<p v-if="chat" class="mb-0 text-truncate">
				<i v-if="chat.isMedia" class="fas fa-paperclip mr-half"/>
				<span>{{ chat.isMedia ? chat.media.name : chat.content }}</span>
			</p>
		</div>
		<span v-if="chat" class="align-self-sm-start">{{ formatTime(chat.createdAt) }}</span>
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
	align-items: center;
}
a:hover {
	transform: none;
	font-size: inherit;
	color: inherit;
	text-decoration: none;
	background: darken($color-light-blue, 2);
}
</style>
