<template>
	<div class="content">
		<img class="current" :src="currentAvatar.link" alt="">
		<div class="others">
			<img v-for="other in otherAvatars" :key="other.id" :src="other.link" alt="" @click="setAvatar(other.id)">
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Avatars } from '@modules/users'
export default defineComponent({
	name: 'SelectAvatar',
	props: {
		avatar: {
			type: String as PropType<keyof typeof Avatars>,
			required: true
		},
		setAvatar: {
			type: Function,
			required: true
		}
	},
	setup (props) {
		const currentAvatar = computed({
			get: () => Avatars[props.avatar] ?? Avatars.default,
			set: () => {}
		})
		const otherAvatars = computed({
			get: () => Object.values(Avatars).filter((a) => a.id !== currentAvatar.value.id),
			set: () => {}
		})
		return { currentAvatar, otherAvatars }
	}
})
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		align-items: center;
		width: 100%;

		img {
			width: 60px;
			height: 60px;
			border-radius: 10rem;
			flex-shrink: unset;
			margin-right: 0.5rem;
		}

		.current {
			width: 90px;
			height: 90px;
			border: 3px solid $color-dark;
		}

		.others {
			display: flex;
			align-items: center;
			overflow-x: auto;
			@extend .hide-scrollbar;
		}
	}
</style>
