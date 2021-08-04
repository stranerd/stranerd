<template>
	<div class="chat gap-0-25" :class="isMine ? 'is-mine' : 'is-not-mine'">
		<div class="d-flex gap-0-25">
			<a v-if="chat.isMedia" class="text-truncate" :href="chat.media.link" target="__blank">
				<i class="fas fa-paperclip me-0-25" />
			</a>
			<DynamicText @click="copy">
				{{ chat.isMedia ? chat.media.name : chat.content }}
			</DynamicText>
		</div>
		<DynamicText class="small ms-auto" @click="copy">
			{{ formatTimeAsDigits(new Date(chat.createdAt)) }}
		</DynamicText>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from '@nuxtjs/composition-api'
import { ChatEntity } from '@modules/sessions'
import { useAuth } from '@app/hooks/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
import { useChat } from '@app/hooks/sessions/chats'
import { copyToClipboard } from '@utils/commons'
export default defineComponent({
	name: 'ChatListCard',
	props: {
		chat: {
			type: Object as PropType<ChatEntity>,
			required: true
		},
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const isMine = computed({
			get: () => props.chat.from === id.value,
			set: () => {}
		})
		const { markChatRead } = useChat(props.chat, props.userId)
		const copy = async () => {
			await copyToClipboard(props.chat.isMedia ? props.chat.media!.link : props.chat.content!)
		}
		onMounted(async () => {
			if (!isMine.value && !props.chat.isRead) await markChatRead()
		})
		return { isMine, formatTimeAsDigits, copy }
	}
})
</script>

<style lang="scss" scoped>
	.chat {
		min-width: 6rem;
		max-width: 75%;
		padding: 0.25rem 0.75rem;
		display: flex;
		flex-direction: column;
	}

	.is-mine {
		border-radius: 0.6rem 0 0.6rem 0.6rem;
		background: $color-line;
		color: $color-dark;
		margin-left: auto;
	}

	.is-not-mine {
		border-radius: 0 0.6rem 0.6rem 0.6rem;
		background: $color-primary;
		color: $color-white;
		margin-right: auto;
	}
</style>
