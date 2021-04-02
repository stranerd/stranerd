<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Waiting for Session
				</h4>
				<a @click.prevent="closeSessionModal">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-half">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>Waiting for {{ otherParticipant.name && otherParticipant.name.first }} to accept your {{ currentSession && currentSession.duration }} minutes session</span>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionModal } from '@app/hooks/core/modals'
import { useCurrentSession } from '@app/hooks/sessions/session'
export default defineComponent({
	name: 'SessionStudentWaiting',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		const { closeSessionModal } = useSessionModal()
		return { closeSessionModal, currentSession, otherParticipant }
	}
})
</script>
