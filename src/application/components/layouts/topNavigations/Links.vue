<template>
	<div class="links d-flex">
		<NuxtLink class="link d-none d-lg-inline" to="/">
			<img src="@/assets/images/icons/search.svg" alt="">
		</NuxtLink>
		<a class="link" @click="setNavigationModalNotification">
			<img src="@/assets/images/icons/notification.svg" alt="">
		</a>
		<a v-if="isLoggedIn" class="link d-none d-lg-inline" @click.prevent="signout">
			<PageLoading v-if="loading" />
			<img src="@/assets/images/icons/signout.svg" alt="">
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
import { useNavigationModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'Links',
	setup () {
		const { isLoggedIn } = useAuth()
		const { setNavigationModalNotification } = useNavigationModal()
		const { loading, signout } = useSessionSignout()
		return { isLoggedIn, loading, signout, setNavigationModalNotification }
	}
})
</script>

<style lang="scss" scoped>
.links {
	.link {
		margin: 0 1rem;
		img {
			width: 24px;
			height: 24px;
			filter: brightness(250%);
		}
		@media (min-width: $md) {
			img {
				width: 28px;
				height: 28px;
			}
		}
	}
}
</style>
