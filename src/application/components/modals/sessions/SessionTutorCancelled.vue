<template>
	<Modal :close="closeSessionModal">
		<template slot="title">
			Session Cancelled
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-0-25">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>cancelled your {{ currentSession && currentSession.duration }} minutes session</span>
			<button class="btn btn-danger my-0-5" @click="closeSessionModal">
				Close Modal
			</button>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionModal } from '@app/hooks/core/modals'
import { useCurrentSession } from '@app/hooks/sessions/session'
export default defineComponent({
	name: 'SessionTutorCancelled',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		const { closeSessionModal } = useSessionModal()
		return { closeSessionModal, currentSession, otherParticipant }
	}
})
</script>
