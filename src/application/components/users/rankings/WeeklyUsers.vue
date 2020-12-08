<template>
	<div>
		<div v-for="user in users" :key="user.hash">
			<TopUserCard :user="user" period="weekly" />
			<hr class="thin">
		</div>
		<h6 class="mt-2">
			Your Ranking
		</h6>
		<hr class="thin">
		<TopUserCard :user="user" period="weekly" />
		<hr class="thick">
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import { useTopWeeklyUsers } from '@app/hooks/users/rankings'
import TopUserCard from '@app/components/users/rankings/TopUserCard.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'WeeklyUsers',
	components: {
		TopUserCard
	},
	setup () {
		const { user } = useAuth()
		const { users, error, loading, startListener, closeListener } = useTopWeeklyUsers()
		onMounted(startListener)
		onBeforeUnmount(closeListener)
		return { user, users, error, loading }
	}
})
</script>
