<template>
	<Modal :close="cancelSession">
		<template slot="title">
			Cancelling Session
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-half">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>cancelled a {{ currentSession && currentSession.duration }} minutes session</span>
			<button class="btn btn-blue my-1" @click="cancelSession">
				Submit
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCurrentSession } from '@app/hooks/sessions/session'
import { useCancelSession } from '@app/hooks/sessions/sessions'
export default defineComponent({
	name: 'SessionStudentCancelled',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		const { loading, error, cancelSession } = useCancelSession()
		return { loading, error, cancelSession, currentSession, otherParticipant }
	}
})
</script>
