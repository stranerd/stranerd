<template>
	<Modal :close="cancelSession">
		<template slot="title">
			New Session Request
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-half">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>is requesting a {{ currentSession && currentSession.duration }} minutes session</span>
			<div class="d-flex flex-column flex-sm-row my-1 gap-1">
				<button class="btn btn-danger" @click="cancelSession">
					Cancel Session
				</button>
				<button class="btn btn-success" @click="acceptSession">
					Accept Session
				</button>
			</div>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCurrentSession } from '@app/hooks/sessions/session'
import { useSession } from '@app/hooks/sessions/sessions'
export default defineComponent({
	name: 'SessionNewSessionRequest',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		const { acceptSession, cancelSession, loading, error } = useSession()
		return {
			currentSession, otherParticipant,
			acceptSession, cancelSession, loading, error
		}
	}
})
</script>
