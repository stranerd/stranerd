<template>
	<div class="d-flex flex-column">
		<div class="text-center my-2">
			<Logo />
		</div>
		<div class="d-flex justify-content-center mb-4 text-light-grey">
			<i class="fas fa-circle mx-1" />
			<i class="fas fa-circle mx-1" />
			<i class="fas fa-circle mx-1" />
		</div>
		<div class="my-1 d-flex flex-column links">
			<NuxtLink class="link" to="/dashboard">
				<img src="@/assets/images/icons/dashboard.svg" alt="">
				<span>Dashboard</span>
			</NuxtLink>
			<NuxtLink class="link" to="/questions">
				<img src="@/assets/images/icons/questions.svg" alt="">
				<span>Questions</span>
			</NuxtLink>
			<NuxtLink v-if="isAdmin" class="link" to="/admin/">
				<img src="@/assets/images/icons/admin.svg" alt="">
				<span>Admin Site</span>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'DefaultSidebar',
	setup () {
		const { isLoggedIn, isAdmin } = useAuth()
		return { isLoggedIn, isAdmin }
	}
})
</script>

<style lang="scss" scoped>
.links {
	.link {
		color: $color-light-blue;
		padding: 0.75rem 1rem;
        margin: 0.25rem 0;
		display: flex;
		align-items: center;
		font-weight: 500;
		img {
			height: 24px;
			width: 24px;
		}
		span {
			font-size: 18px;
			margin-left: 0.75rem;
		}
	}
	.nuxt-link-exact-active {
		font-weight: 600;
		color: $color-blue;
		background: $color-light-blue;
        border-radius: 1rem;
		img { filter: brightness(60%); }
	}
}
</style>
