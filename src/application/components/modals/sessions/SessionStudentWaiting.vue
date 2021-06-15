<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Waiting for Session
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-0-25">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>Waiting for {{ otherParticipant.name && otherParticipant.name.first }} to accept your {{ currentSession && currentSession.duration }} minutes session</span>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCurrentSession } from '@app/hooks/sessions/session'
export default defineComponent({
	name: 'SessionStudentWaiting',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		return { currentSession, otherParticipant }
	}
})
</script>
