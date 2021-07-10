<template>
	<div class="my-1">
		<div class="d-flex align-items-center gap-0-5">
			<span class="text-truncate flex-grow-1">
				{{ session.duration }} minutes session with {{ session.studentBio.name.fullName }}
			</span>
			<button class="btn btn-sm btn-success rounded" @click="acceptSession">
				Accept
			</button>
			<button class="btn btn-sm btn-danger rounded" @click="cancelSession">
				Cancel
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SessionEntity } from '@modules/sessions'
import { useSession } from '@app/hooks/sessions/sessions'
export default defineComponent({
	name: 'LobbySessionsListCard',
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
