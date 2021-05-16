<template>
	<Modal :close="cancelSession">
		<template slot="title">
			Cancelling Session
		</template>
		<form @submit.prevent="cancelSession">
			<div class="form-group mb-2">
				<textarea
					v-model="factory.message"
					class="form-control"
					placeholder="Leave a message"
					rows="4"
				/>
				<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
			</div>
			<button class="btn btn-blue" @click="cancelSession">
				Submit
			</button>
		</form>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCurrentSession } from '@app/hooks/sessions/session'
import { useCancelSession } from '@app/hooks/sessions/sessions'
export default defineComponent({
	name: 'SessionStudentCancelling',
	setup () {
		const { clone: currentSession, otherParticipant } = useCurrentSession()
		const { loading, error, cancelSession, factory } = useCancelSession()
		return { loading, error, cancelSession, currentSession, otherParticipant, factory }
	}
})
</script>
