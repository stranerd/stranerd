<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Unknown State
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-0-25">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>An unknown error occurred</span>
			<button class="btn btn-danger my-0-5" @click="closeModal">
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
	name: 'SessionUnknown',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		const closeModal = useSessionModal().closeUnknown
		return { closeModal, currentSession, otherParticipant }
	}
})
</script>
