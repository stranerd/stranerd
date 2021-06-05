<template>
	<div>
		<div v-if="isLoggedIn" class="d-none d-lg-block w-100">
			<ProfileHeadCard :user="user" />
			<div class="thin mx-n1 my-0-25" />
		</div>
		<div>
			<template v-if="isLoggedIn && ongoingAchievements.length > 0">
				<AchievementsList class="content" />
				<div class="thin mx-n1 my-0-25" />
			</template>
			<TopUsers class="content" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import TopUsers from '@app/components/users/rankings/TopUsers.vue'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
import AchievementsList from '@app/components/users/achievements/AchievementsList.vue'
export default defineComponent({
	name: 'DashboardRightPanel',
	components: { TopUsers, ProfileHeadCard, AchievementsList },
	setup () {
		const { id, isLoggedIn, user, ongoingAchievements } = useAuth()
		return { id, isLoggedIn, user, ongoingAchievements }
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
