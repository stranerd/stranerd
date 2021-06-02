<template>
	<NuxtLink :to="`/messages/${meta.id}`" class="gap-0-5">
		<Avatar :src="meta.bio.avatar" :size="60" />
		<div class="flex-grow-1 text-truncate">
			<div class="d-flex justify-content-between gap-0-5">
				<span class="fw-bold lead d-inline-block text-truncate">{{ meta.bio.name.fullName }}</span>
			</div>
			<div class="d-flex justify-content-between text-truncate gap-0-5">
				<p class="mb-0 text-truncate">
					<span v-if="unreadMessages > 0" class="bg-blue text-white rounded-pill d-inline-flex align-items-center justify-content-center" style="height: 1.25em; width:1.25em;">
						<span>{{ unreadMessages }}</span>
					</span>
					<i v-if="meta.last.isMedia" class="fas fa-paperclip mx-0-25" />
					{{ meta.last.isMedia ? meta.last.media.name : meta.last.content }}
				</p>
			</div>
		</div>
	</NuxtLink>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
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
	setup (props) {
		const unreadMessages = computed(() => {
			return Object.values(props.meta.unRead ?? {}).length
		})
		return { formatTime, unreadMessages }
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
