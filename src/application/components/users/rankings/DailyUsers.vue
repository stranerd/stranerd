<template>
	<div>
		<div v-for="user in users" :key="user.hash">
			<TopUserCard :user="user" period="daily" />
			<hr class="thin">
		</div>
		<DisplayError v-if="!loading && users.length === 0" error="No users found." />
		<div v-if="isLoggedIn">
			<h6 class="mt-2">
				Your Ranking
			</h6>
			<hr class="thin">
			<TopUserCard :user="user" period="daily" />
			<hr class="thick">
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import { useTopDailyUsers } from '@app/hooks/users/rankings'
import TopUserCard from '@app/components/users/rankings/TopUserCard.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'DailyUsers',
	components: {
		TopUserCard
	},
	setup () {
		const { user, isLoggedIn } = useAuth()
		const { users, error, loading, listener } = useTopDailyUsers()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { user, isLoggedIn, users, error, loading }
	}
})
</script>
