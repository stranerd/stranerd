<template>
	<div>
		<div v-if="isLoggedIn" class="d-none d-lg-block w-100">
			<ProfileHeadCard :user="user" />
			<div class="thick mx-n2" />
		</div>
		<div>
			<TopUsers class="content" />
			<div class="thick mx-n2" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import TopUsers from '@app/components/users/rankings/TopUsers.vue'
import { formatNumber } from '@app/hooks/core/numbers'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
export default defineComponent({
	name: 'DashboardRightPanel',
	components: { TopUsers, ProfileHeadCard },
	setup () {
		const { id, isLoggedIn, user } = useAuth()
		return { id, isLoggedIn, user, formatNumber }
	}
})
</script>

<style lang="scss" scoped>
.content {
	background-color: $color-white;
	border-radius: 0.5rem;
	width: 100%;
	padding: 0.5rem;
	@media (min-width: $md) {
		border-radius: 1.0rem;
		padding: 1rem;
	}
	@media (min-width: $lg) {
		padding: 0;
	}
}
</style>
