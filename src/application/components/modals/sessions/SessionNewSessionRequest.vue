<template>
	<Modal :show-separator="false">
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					New Session Request
				</h4>
				<a @click.prevent="cancelSession">
					<i class="fas fa-times text-danger" />
				</a>
			</div>
		</template>
		<div class="d-flex flex-column align-items-center">
			<Avatar :src="otherParticipant.avatar" :size="90" />
			<span class="lead my-half">{{ otherParticipant.name && otherParticipant.name.fullName }}</span>
			<span>is requesting a {{ currentSession && currentSession.duration }} minutes session</span>
			<span class="my-1">{{ currentSession && currentSession.message }}</span>
			<div class="d-flex flex-column flex-sm-row">
				<button class="btn btn-danger my-half mx-half" @click="cancelSession">
					Cancel Session
				</button>
				<button class="btn btn-green my-half mx-half" @click="acceptSession">
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
