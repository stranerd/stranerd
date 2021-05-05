<template>
	<Modal :close="closeSessionModal">
		<template slot="title">
			Request Session
		</template>
		<form @click.prevent="createSession">
			<div class="form-group my-2">
				<textarea
					v-model="factory.message"
					class="form-control"
					rows="3"
					placeholder="Leave a message for the nerd"
					:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message') }"
				/>
				<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
			</div>
			<div class="form-group my-2">
				<select v-model="factory.duration" class="form-control">
					<option disabled value="0">
						Select Session Duration
					</option>
					<option v-for="option in prices" :key="option.duration" :value="option.duration">
						{{ option.duration }} minutes - {{ option.price }} bronze coins
					</option>
				</select>
			</div>
			<button class="btn btn-blue my-2 w-100" type="submit" :disabled="loading || !factory.valid">
				Request Session
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSessionModal } from '@app/hooks/core/modals'
import { useCreateSession } from '@app/hooks/sessions/sessions'
export default defineComponent({
	name: 'SessionCreateSession',
	setup () {
		const { closeSessionModal } = useSessionModal()
		const { prices, factory, loading, error, createSession } = useCreateSession()
		return {
			closeSessionModal,
			prices, factory, loading, error, createSession
		}
	}
})
</script>
