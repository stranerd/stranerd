<template>
	<div>
		<h2>Pending Sessions</h2>
		<RequestSessionsListCard v-for="session in sessions" :key="session.hash" :session="session" />
		<PageLoading v-if="loading" />
		<DisplayWarning v-if="!loading && !error && sessions.length === 0" message="No pending sessions." />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useRequestSessions } from '@app/hooks/sessions/session'
import RequestSessionsListCard from '@app/components/sessions/sessions/RequestSessionsListCard.vue'
export default defineComponent({
	name: 'RequestSessionsList',
	components: { RequestSessionsListCard },
	setup () {
		const { loading, error, listener, sessions } = useRequestSessions()
		onMounted(() => {
			if (!listener.isRunning) listener.startListener()
		})
		return { loading, error, sessions }
	}
})
</script>
