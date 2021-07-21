<template>
	<NuxtLink :to="`/sessions/${meta.id}`" class="gap-0-5">
		<Avatar :src="meta.bio.avatar" :size="64" />
		<div class="flex-grow-1 text-truncate">
			<div class="d-flex justify-content-between align-items-center gap-0-5">
				<span class="name d-inline-block text-truncate">
					<DynamicText :text="meta.bio.name.fullName" />
				</span>
				<span>{{ formatTime(meta.last.createdAt, true) }}</span>
			</div>
			<div class="d-flex align-items-center text-truncate gap-0-25">
				<i v-if="meta.last.isMedia" class="fas fa-paperclip" />
				<span :class="{ 'unread': meta.unRead.length > 0 }">
					<DynamicText :text="meta.last.isMedia ? meta.last.media.name : meta.last.content" />
				</span>
			</div>
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
		padding: 0.6rem;
		display: flex;
		align-items: center;
		font-weight: 600;
		border-bottom: 1px solid $color-line;
	}

	a.nuxt-link-exact-active {
		background: $color-tags;
	}

	a:hover {
		transform: none;
		font-size: inherit;
		color: inherit;
		text-decoration: none;
	}

	.name {
		font-size: 1.25rem;
		color: $color-dark;
	}

	.unread { font-weight: 600; }
</style>
