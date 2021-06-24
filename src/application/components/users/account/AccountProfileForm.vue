<template>
	<form @submit.prevent="updateProfile">
		<SelectAvatar :avatar="factory.avatar || Avatars.default.id" :set-avatar="(a) => factory.avatar = a" />
		<div class="form-group d-flex flex-column flex-md-row gap-0-5 my-1-5">
			<div class="flex-grow-1">
				<label class="label" for="fName">First Name</label>
				<input
					id="fName"
					v-model="factory.first"
					class="form-control"
					placeholder="Eg. John"
					:class="{'is-invalid': factory.errors.first}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.first }}</small>
			</div>
			<div class="flex-grow-1">
				<label class="label" for="lName">Last Name</label>
				<input
					id="lName"
					v-model="factory.last"
					class="form-control"
					placeholder="Eg. Doe"
					:class="{'is-invalid': factory.errors.last}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.last }}</small>
			</div>
		</div>
		<div class="my-1-5 gap-0-5">
			<div class="form-group">
				<label class="label" for="description">Tell us a little about yourself <i>(optional)</i></label>
				<textarea
					id="description"
					v-model="factory.description"
					class="form-control"
					placeholder=""
					:class="{'is-invalid': factory.errors.description}"
					rows="3"
				/>
				<small v-if="factory.errors.description" class="small text-danger d-block">{{ factory.errors.description }}</small>
			</div>
		</div>
		<div v-if="auth.signInMethod === 'password'" class="gap-0-5">
			<hr class="mt-2">
			<p class="small text-center mb-1">
				Fill this if you want to update your password
			</p>
			<div class="form-group my-1">
				<label class="label d-flex gap-0-5 align-items-end" for="password">
					<span>New Password</span>
					<a class="label-sm ms-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
				</label>
				<input
					id="password"
					v-model="factory.password"
					class="form-control"
					:type="show ? 'text' : 'password'"
					:class="{'is-invalid': factory.errors.password}"
				>
				<small v-if="factory.errors.password" class="small text-danger d-block">{{ factory.errors.password }}</small>
			</div>
			<div class="form-group my-1">
				<label class="label d-flex gap-0-5 align-items-end" for="cPassword">
					<span>Confirm New Password</span>
					<a class="label-sm ms-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
				</label>
				<input
					id="cPassword"
					v-model="factory.cPassword"
					class="form-control"
					:type="show ? 'text' : 'password'"
					:class="{'is-invalid': factory.errors.cPassword}"
				>
				<small v-if="factory.errors.cPassword" class="small text-danger d-block">{{ factory.errors.cPassword }}</small>
			</div>
		</div>
		<div class="d-flex justify-content-end my-1-5">
			<button class="btn btn-danger me-0-5" @click="cancel">
				Cancel
			</button>
			<button class="btn btn-blue" type="submit" :disabled="loading || !factory.valid">
				Save Profile
			</button>
		</div>
		<PageLoading v-if="loading" class="me-1" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useUpdateProfile } from '@app/hooks/users/account'
import { useAuth } from '@app/hooks/auth/auth'
import { usePassword } from '@app/hooks/core/forms'
import { Avatars } from '@modules/users'
import SelectAvatar from '@app/components/users/account/SelectAvatar.vue'
export default defineComponent({
	name: 'AccountProfileForm',
	components: { SelectAvatar },
	props: {
		cancel: {
			required: true,
			type: Function as PropType<() => {}>
		}
	},
	setup () {
		const { auth } = useAuth()
		const { show, toggle } = usePassword()
		const { factory, error, loading, updateProfile } = useUpdateProfile()
		return {
			auth, show, toggle,
			factory, error, loading, updateProfile, Avatars
		}
	}
})
</script>
