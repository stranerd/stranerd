<template>
	<NuxtLink :to="`/messages/${meta.id}`" class="gap-0-5">
		<Avatar :src="meta.bio.avatar" :size="60" />
		<div class="flex-grow-1 text-truncate">
			<div class="d-flex justify-content-between gap-0-5">
				<span class="fw-bold lead d-inline-block text-truncate">{{ meta.bio.name.fullName }}</span>
				<span class="ms-auto">{{ formatTime(meta.chat.createdAt) }}</span>
			</div>
			<p class="mb-0 text-truncate">
				<i v-if="meta.chat.isMedia" class="fas fa-paperclip me-0-25" />
				{{ meta.chat.isMedia ? meta.chat.media.name : meta.chat.content }}
			</p>
		</div>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { formatTime } from '@utils/dates'
import { ChatMetaEntity } from '@modules/sessions'
export default defineComponent({
	name: 'UserChatCard',
	props: {
		meta: {
			type: Object as PropType<ChatMetaEntity>,
			required: true
		}
	},
	setup () {
		return { formatTime }
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
