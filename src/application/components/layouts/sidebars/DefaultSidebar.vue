<template>
	<div>
		<div v-if="isLoggedIn" class="mt-3">
			<ProfileHeadCard :user="user" />
			<div class="thick bg-blue-grey mx-n1" />
		</div>
		<div class="my-2 d-flex flex-column links">
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
import { formatNumber } from '@app/hooks/core/numbers'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'DefaultSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { isLoggedIn, user, isAdmin } = useAuth()
		return { isLoggedIn, user, isAdmin, formatNumber }
	}
})
</script>

<style lang="scss" scoped>
.links {
	.link {
		color: $color-blue;
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
		color: $color-light-blue;
		background: $color-blue;
		border-radius: 1rem;
		img { filter: brightness(200%); }
	}
}
</style>
