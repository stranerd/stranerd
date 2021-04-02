<template>
	<div>
		<SessionCreateSession v-if="isSessionModalCreateSession" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionModal } from '@app/hooks/core/modals'
import SessionCreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
export default defineComponent({
	name: 'SessionModalIndex',
	components: {
		SessionCreateSession
	},
	setup () {
		const { isSessionModalCreateSession } = useSessionModal()
		return { isSessionModalCreateSession }
	}
})
</script>
