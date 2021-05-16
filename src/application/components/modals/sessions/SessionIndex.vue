<template>
	<div>
		<SessionCreateSession v-if="isSessionModalCreateSession" />
		<SessionNewSessionRequest v-if="isSessionModalNewSessionRequest" />
		<SessionStudentWaiting v-if="isSessionModalStudentWaiting" />
		<SessionTutorCancelled v-if="isSessionModalTutorCancelled" />
		<SessionStudentCancelled v-if="isSessionModalStudentCancelled" />
		<SessionCancelling v-if="isSessionModalCancelling" />
		<SessionUnknown v-if="isSessionModalUnknown" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionModal } from '@app/hooks/core/modals'
import SessionCreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
import SessionNewSessionRequest from '@app/components/modals/sessions/SessionNewSessionRequest.vue'
import SessionStudentWaiting from '@app/components/modals/sessions/SessionStudentWaiting.vue'
import SessionTutorCancelled from '@app/components/modals/sessions/SessionTutorCancelled.vue'
import SessionCancelling from '@app/components/modals/sessions/SessionCancelling.vue'
import SessionStudentCancelled from '@app/components/modals/sessions/SessionStudentCancelled.vue'
import SessionUnknown from '@app/components/modals/sessions/SessionUnknown.vue'
export default defineComponent({
	name: 'SessionModalIndex',
	components: {
		SessionCreateSession, SessionNewSessionRequest, SessionStudentWaiting,
		SessionTutorCancelled, SessionStudentCancelled, SessionUnknown, SessionCancelling
	},
	setup () {
		const { isSessionModalCreateSession, isSessionModalNewSessionRequest, isSessionModalStudentWaiting, isSessionModalStudentCancelled, isSessionModalTutorCancelled, isSessionModalUnknown, isSessionModalCancelling } = useSessionModal()
		return { isSessionModalCreateSession, isSessionModalNewSessionRequest, isSessionModalStudentWaiting, isSessionModalStudentCancelled, isSessionModalTutorCancelled, isSessionModalUnknown, isSessionModalCancelling }
	}
})
</script>
