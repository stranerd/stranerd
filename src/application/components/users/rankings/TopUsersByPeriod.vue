<template>
	<div>
		<hr class="thin">
		<div v-for="(user, index) in users" :key="user.hash">
			<TopUserCard :user="user" :period="period" />
			<hr v-if="index !== users.length - 1 || !isLoggedIn" class="thin">
		</div>
		<div v-if="isLoggedIn">
			<div class="my-2 mx-n1 bg-light-grey" style="height: 8px;" />
			<h6 class="font-weight-bold">
				Your Ranking
			</h6>
			<hr class="thin">
			<TopUserCard :user="user" :period="period" />
			<hr class="thin">
		</div>
		<DisplayWarning v-if="!loading && !error && users.length === 0" message="No users found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, PropType } from '@nuxtjs/composition-api'
import { useTopUsersByPeriod } from '@app/hooks/users/rankings'
import TopUserCard from '@app/components/users/rankings/TopUserCard.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { RankingPeriods } from '@modules/users'
export default defineComponent({
	name: 'TopUsersByPeriod',
	components: {
		TopUserCard
	},
	props: {
		period: {
			type: String as PropType<RankingPeriods>,
			required: true
		}
	},
	setup (props) {
		const { user, isLoggedIn } = useAuth()
		const { users, error, loading, listener } = useTopUsersByPeriod(props.period)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { user, isLoggedIn, users, error, loading }
	}
})
</script>
