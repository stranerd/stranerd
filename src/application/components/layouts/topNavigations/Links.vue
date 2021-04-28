<template>
	<div class="links d-flex align-items-center">
		<NuxtLink class="link d-lg-none" to="/">
			<img src="@app/assets/images/icons/search.svg" alt="">
		</NuxtLink>
		<div class="link d-none d-lg-inline-flex search">
			<img src="@app/assets/images/icons/search.svg" alt="">
			<input class="form-control" type="search" placeholder="Search for anything">
		</div>
		<template v-if="isLoggedIn">
			<NuxtLink to="/account/notifications" class="link">
				<img src="@app/assets/images/icons/notification.svg" alt="">
			</NuxtLink>
			<NuxtLink to="/messages" class="link">
				<img src="@app/assets/images/icons/chat.svg" alt="">
			</NuxtLink>
			<a class="link d-none d-lg-inline" @click.prevent="signout">
				<PageLoading v-if="loading" />
				<img src="@app/assets/images/icons/signout.svg" alt="">
			</a>
		</template>
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
	@media (min-width: $lg) {
		padding: 1rem 0;
		width: 100%;
	}
	.link {
		padding: 0 0.75rem;
		img {
			width: 18px;
			height: 18px;
			filter: brightness(250%);
		}
		@media (min-width: $md) {
			padding: 0 1rem;
			img {
				width: 21px;
				height: 21px;
			}
		}
		@media (min-width: $lg) {
			padding: 0 2rem;
			border-left: 1px solid $color-blue;
			img {
				filter: brightness(60%);
			}
		}
	}
}
.search {
	align-items: center;
	flex-grow: 1;
	border-left: 0 !important;
	input {
		height: 1.5rem;
		border: none;
		box-shadow: none;
		min-height: unset;
		padding: 0 1rem;
	}
}
</style>
