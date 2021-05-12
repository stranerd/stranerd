<template>
	<div class="links d-flex align-items-center">
		<template v-if="showSearch">
			<a class="me-1" @click.prevent="showSearch = false">
				<i class="fas fa-times" />
			</a>
			<SearchBar />
		</template>
		<template v-else>
			<a class="link d-md-none">
				<img src="@app/assets/images/icons/search.svg" alt="" @click="showSearch = true">
			</a>
			<div class="link d-none d-md-inline-flex flex-grow-1 align-items-center border-0">
				<SearchBar />
			</div>
			<NuxtLink to="/account/notifications" class="link">
				<img src="@app/assets/images/icons/notification.svg" alt="">
			</NuxtLink>
			<NuxtLink to="/messages" class="link">
				<img src="@app/assets/images/icons/chat.svg" alt="">
			</NuxtLink>
			<a v-if="isLoggedIn" class="link d-none d-lg-inline" @click.prevent="signout">
				<PageLoading v-if="loading" />
				<img src="@app/assets/images/icons/signout.svg" alt="">
			</a>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useSessionSignout } from '@app/hooks/auth/session'
import SearchBar from '@app/components/search/SearchBar.vue'
export default defineComponent({
	name: 'Links',
	components: { SearchBar },
	setup () {
		const showSearch = ref(false)
		const { isLoggedIn } = useAuth()
		const { loading, signout } = useSessionSignout()
		return { showSearch, isLoggedIn, loading, signout }
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
			width: 21px;
			height: 21px;
		}
		@media (min-width: $sm) {
			padding: 0 1rem;
		}
		@media (min-width: $lg) {
			padding: 0 2rem;
			border-left: 1px solid $color-blue;
		}
	}
}
</style>
