<template>
	<form @submit.prevent="updateProfile">
		<div class="form-group d-flex flex-column flex-md-row my-3">
			<div class="mb-3 mb-md-0 mr-md-2 flex-grow-1">
				<label class="label">First Name</label>
				<input
					v-model="factory.first"
					class="form-control"
					placeholder="Eg. John"
					:class="{'is-invalid': factory.errors.first}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.first }}</small>
			</div>
			<div class="flex-grow-1">
				<label class="label">Last Name</label>
				<input
					v-model="factory.last"
					class="form-control"
					placeholder="Eg. Doe"
					:class="{'is-invalid': factory.errors.last}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.last }}</small>
			</div>
		</div>
		<div class="form-group my-3">
			<label class="label">Tell us a little about yourself <i>(optional)</i></label>
			<textarea
				v-model="factory.description"
				class="form-control"
				placeholder=""
				:class="{'is-invalid': factory.errors.description}"
				rows="3"
			/>
			<small v-if="factory.errors.description" class="small text-danger d-block">{{ factory.errors.description }}</small>
		</div>
		<div class="d-flex justify-content-end my-3">
			<button class="btn btn-danger mr-1" @click="cancel">
				Cancel
			</button>
			<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
				Save Profile
			</button>
		</div>
		<PageLoading v-if="loading" class="mr-2" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useUpdateProfile } from '@app/hooks/users/account'
export default defineComponent({
	name: 'AccountProfileForm',
	props: {
		cancel: {
			required: true,
			type: Function as PropType<() => {}>
		}
	},
	setup () {
		const { factory, error, loading, updateProfile } = useUpdateProfile()
		return { factory, error, loading, updateProfile }
	}
})
</script>
