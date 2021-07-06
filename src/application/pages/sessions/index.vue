<template>
	<div>
		<div v-if="user.canHostSessions" class="page-content">
			<LobbySessionsList />
		</div>
		<div class="page-content">
			<RequestSessionsList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import RequestSessionsList from '@app/components/sessions/sessions/RequestSessionsList.vue'
import LobbySessionsList from '@app/components/sessions/sessions/LobbySessionsList.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'SessionsPage',
	components: { RequestSessionsList, LobbySessionsList },
	middleware: 'isAuthenticated',
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
