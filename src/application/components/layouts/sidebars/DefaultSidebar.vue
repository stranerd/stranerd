<template>
	<div>
		<div v-if="isLoggedIn" class="d-flex flex-column my-3">
			<div class="w-100 d-flex justify-content-between mb-1">
				<div class="d-flex align-items-center position-relative ml-1">
					<Coins :size="20" style="z-index:1;" />
					<span class="rounded-pill ml-n2 pr-1 small bg-blue-grey text-light-blue" style="padding-left: 1.25rem;">
						{{ formatNumber(user.account.coins.bronze) }}
					</span>
				</div>
				<div class="d-flex align-items-center position-relative ml-1">
					<Coins :gold="true" :size="20" style="z-index:1;" />
					<span class="rounded-pill ml-n2 pr-1 small bg-blue-grey text-light-blue" style="padding-left: 1.25rem;">
						{{ formatNumber(user.account.coins.gold) }}
					</span>
				</div>
			</div>
			<div class="d-flex">
				<img :src="user.avatar" alt="" class="profile-image" style="width:60px;height:60px;">
				<div class="d-flex flex-column ml-1">
					<span class="text-18 font-weight-bold">{{ user.firstName }}</span>
					<NuxtLink to="/account/" style="text-decoration: underline;">
						View Profile
					</NuxtLink>
				</div>
			</div>
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
export default defineComponent({
	name: 'DefaultSidebar',
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
		img { filter: brightness(150%); }
	}
}
</style>
