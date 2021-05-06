<template>
	<div class="d-flex">
		<div class="chat" :class="isMine ? 'is-mine' : 'is-not-mine'">
			<a v-if="chat.isMedia" :href="chat.media.link" target="__blank">
				<i class="fas fa-paperclip me-half" />
				<span class="text-truncate">{{ chat.media.name }}</span>
			</a>
			<span v-else>{{ chat.content || 'Hello' }}</span>
			<span class="ms-auto small">{{ formatTimeAsDigits(new Date(chat.createdAt)) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { ChatEntity } from '@modules/sessions'
import { useAuth } from '@app/hooks/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'
export default defineComponent({
	name: 'ChatListCard',
	props: {
		chat: {
			type: Object as PropType<ChatEntity>,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const isMine = computed({
			get: () => props.chat.from === id.value,
			set: () => {}
		})
		return { isMine, formatTimeAsDigits }
	}
})
</script>

<style lang="scss" scoped>
.chat{
	min-width: 6rem;
	max-width: 75%;
	padding: 0.25rem 0.75rem;
	margin: 0.25rem 0;
	display: flex;
	flex-direction: column;
}
.is-mine{
	border-radius: 0.6rem 0.6rem 0 0.6rem;
	background: #C1D2E3;
	color: $color-blue;
	margin-left: auto;
}
.is-not-mine{
	border-radius: 0 0.6rem 0.6rem 0.6rem;
	background: #5D94CC;
	color: $color-light-blue;
}
</style>
