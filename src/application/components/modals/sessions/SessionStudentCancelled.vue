<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Session Cancelled
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-0-25">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>cancelled a {{ currentSession && currentSession.duration }} minutes session</span>
			<button class="btn btn-danger my-0-5" @click="closeModal">
				Close Modal
			</button>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modals'
import { useCurrentSession } from '@app/hooks/sessions/session'
export default defineComponent({
	name: 'SessionStudentCancelled',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		const closeModal = () => useModal().removeFromStack('SessionTutorCancelled')
		return { currentSession, otherParticipant, closeModal }
	}
})
</script>
