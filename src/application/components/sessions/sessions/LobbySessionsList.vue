<template>
	<div>
		<h2>Requested Sessions</h2>
		<LobbySessionsListCard v-for="session in sessions" :key="session.hash" :session="session" />
		<PageLoading v-if="loading" />
		<DisplayWarning v-if="!loading && !error && sessions.length === 0" message="No requested sessions." />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useLobbySessions } from '@app/hooks/sessions/session'
import LobbySessionsListCard from '@app/components/sessions/sessions/LobbySessionsListCard.vue'
export default defineComponent({
	name: 'LobbySessionsList',
	components: { LobbySessionsListCard },
	setup () {
		const { loading, error, listener, sessions } = useLobbySessions()
		onMounted(() => {
			if (!listener.isRunning) listener.startListener()
		})
		return { loading, error, sessions }
	}
})
</script>
