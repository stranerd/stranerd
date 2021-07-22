<template>
	<div class="d-flex gap-1 align-items-center bg-white p-0-25">
		Waiting for {{ session.tutorBio.name.fullName }} to accept session
	</div>
</template>

<script lang="ts">
import { SessionEntity } from '@modules/sessions'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'StudentWaitingSession',
	props: {
		session: {
			type: Object as PropType<SessionEntity>,
			required: true
		}
	}
})
</script>
