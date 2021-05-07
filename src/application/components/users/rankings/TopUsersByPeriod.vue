<template>
	<div>
		<div v-for="(user, index) in users" :key="user.hash">
			<TopUserCard :user="user" :period="period" :rank="index + 1" />
		</div>
		<DisplayWarning v-if="!loading && users.length === 0" message="No user has earned any xp for this period" />
		<div v-if="isLoggedIn">
			<div class="thick" />
			<h6 class="fw-bold">
				You
			</h6>
			<TopUserCard :user="user" :period="period" :rank="myRank" />
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, PropType, computed } from '@nuxtjs/composition-api'
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
		const { id, user, isLoggedIn } = useAuth()
		const { users, error, loading, listener } = useTopUsersByPeriod(props.period)
		const myRank = computed({
			get: () => {
				const index = users.value.findIndex((user) => user.id === id.value)
				return index !== -1 ? index + 1 : '#'
			},
			set: () => {}
		})
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { myRank, user, isLoggedIn, users, error, loading }
	}
})
</script>
