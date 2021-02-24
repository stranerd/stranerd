<template>
	<div class="d-flex flex-column flex-md-row flex-lg-column align-items-start">
		<div v-if="isLoggedIn" class="d-none d-lg-block w-100">
			<div class="d-flex flex-column align-items-center">
				<img :src="user.avatar" alt="" class="profile-image" style="width:90px;height:90px;">
				<span class="text-18 font-weight-bold">{{ user.firstName }}</span>
				<div class="d-flex justify-content-center">
					<span>
						<span>{{ formatNumber(user.account.coins.bronze) }}</span>
						<Coins :size="16" />
					</span>
					<span>
						<span>{{ formatNumber(user.account.coins.gold) }}</span>
						<Coins :gold="true" :size="16" />
					</span>
				</div>
				<NuxtLink to="/account/" class="btn my-2 btn-outline-accent rounded-pill px-3 py-1">
					View Profile
				</NuxtLink>
			</div>
			<div class="my-2 bg-light-grey mx-n1" style="height: 8px;" />
		</div>
		<div class="content">
			<h3 class="d-none d-lg-block mb-2 text-center font-weight-bold">
				Rankings
			</h3>
			<div class="body">
				<TopUsers />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import TopUsers from '@app/components/users/rankings/TopUsers.vue'
export default defineComponent({
	name: 'DashboardRightPanel',
	components: { TopUsers },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		return { id, isLoggedIn, user }
	}
})
</script>

<style lang="scss" scoped>
.content {
	background-color: $color-white;
	border-radius: 0.5rem;
	width: 100%;
	@media (min-width: $md) {
		flex-grow: 1;
		border-radius: 1.0rem;
		max-width: 50%;
	}
	@media (min-width: $lg) {
		padding: 0;
		flex-grow: 0;
		max-width: 100%;
	}
	.body {
		@media (min-width: $lg) {
			background-color: lighten($color-light-grey, 7);
			border-radius: 0.25rem;
			border: 1px solid lighten($color-light-grey, 0);
			box-shadow: 0 3px 6px rgba($color-black, 0.1);
		}
	}
}
</style>
