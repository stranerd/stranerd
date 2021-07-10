<template>
	<div class="my-1 d-flex border rounded p-0-5 gap-0-5">
		<span>Waiting for {{ session.tutorBio.name.fullName }} to accept session</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SessionEntity } from '@modules/sessions'
export default defineComponent({
	name: 'RequestSessionsListCard',
	props: {
		session: {
			type: Object as PropType<SessionEntity>,
			required: true
		}
	}
})
</script>
