<template>
	<div class="links d-flex">
		<NuxtLink class="link" to="/">
			<img src="@/assets/images/icons/search.svg" alt="">
		</NuxtLink>
		<NuxtLink class="link d-none d-md-inline" to="/">
			<img src="@/assets/images/icons/chat.svg" alt="">
		</NuxtLink>
		<NuxtLink class="link d-none d-md-inline" to="/">
			<img src="@/assets/images/icons/friends.svg" alt="">
		</NuxtLink>
		<NuxtLink class="link" to="/">
			<img src="@/assets/images/icons/notification.svg" alt="">
		</NuxtLink>
		<a v-if="isLoggedIn" class="link d-none d-md-inline" @click.prevent="signout">
			<PageLoading v-if="loading" />
			<img src="@/assets/images/icons/signout.svg" alt="">
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'Links',
	setup () {
		const { isLoggedIn } = useAuth()
		const { loading, signout } = useSessionSignout()
		return { isLoggedIn, loading, signout }
	}
})
</script>

<style lang="scss" scoped>
.links {
	.link {
		color: $color-grey;
		margin: 0 1rem;
		img {
			width: 24px;
			height: 24px;
		}
		@media (min-width: $md) {
			img {
				width: 28px;
				height: 28px;
			}
		}
		@media (min-width: $lg) {
			width: 36px;
			height: 36px;
			background: $color-white;
			border-radius: 10rem;
			margin: 0 0.5rem;
			img {
				margin: 8px;
				width: 20px;
				height: 20px;
			}
		}
	}
}
</style>
