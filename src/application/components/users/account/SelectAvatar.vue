<template>
	<div class="content">
		<div>
			<img class="current" :src="currentAvatar.link" alt="">
		</div>
		<div class="others">
			<div v-for="other in otherAvatars" :key="other.id">
				<img :src="other.link" alt="" @click="setAvatar(other.id)">
				<p class="text-center my-0">
					{{ other.id }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { Avatars } from '@modules/users'
export default defineComponent({
	name: 'SelectAvatar',
	props: {
		avatar: {
			type: String,
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
@import "../../../assets/styles/index.scss";
.content {
	display: flex;
	align-items: center;
	width: 100%;
	img {
		width: 75px;
		height: 75px;
		border-radius: 10rem;
		margin-right: 0.5rem;
	}
	.current {
		width: 90px;
		height: 90px;
		border: 3px solid $color-blue;
	}
	.others {
		display: flex;
		align-items: center;
		overflow-x: auto;
		@extend .hide-scrollbar;
	}
}
</style>
