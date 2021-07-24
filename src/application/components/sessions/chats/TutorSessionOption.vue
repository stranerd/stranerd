<template>
	<div class="d-flex gap-1 align-items-center justify-content-center bg-white p-0-25">
		<button class="btn btn-sm btn-success flex-grow-1 w-100" @click="acceptSession">
			Accept
		</button>
		<button class="btn btn-sm btn-danger flex-grow-1 w-100" @click="cancelSession">
			Cancel
		</button>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { SessionEntity } from '@modules/sessions'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSession } from '@app/hooks/sessions/sessions'
export default defineComponent({
	name: 'TutorSessionOption',
	props: {
		session: {
			type: Object as PropType<SessionEntity>,
			required: true
		}
	},
	setup (props) {
		const { acceptSession, cancelSession, loading, error } = useSession(props.session.id)
		return { acceptSession, cancelSession, loading, error }
	}
})
</script>
