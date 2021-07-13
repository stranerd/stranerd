<template>
	<form class="d-flex flex-column gap-1-5" @submit.prevent="updateProfile">
		<!-- <SelectAvatar :avatar="factory.avatar" :set-avatar="(a) => factory.avatar = a" /> -->
		<!-- TODO: toggle back visibility after implementing profile image -->
		<div class="form-group d-none">
			<label id="uploadbtn" for="picture" class="px-3 bg-tags text-dark border border-line text-center">Upload New Profile Picture</label>
			<input
				id="picture"
				class="d-none"
				type="file"
				name="file"
				accept="image/*"
			>
		</div>
		<div class="form-group d-flex flex-column flex-md-row gap-1">
			<div class="flex-grow-1 w-100">
				<input
					id="fName"
					v-model="factory.first"
					class="form-control"
					placeholder="First Name"
					:class="{'is-invalid': factory.errors.first}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.first }}</small>
			</div>
			<div class="flex-grow-1 w-100">
				<input
					id="lName"
					v-model="factory.last"
					class="form-control"
					placeholder="Last Name"
					:class="{'is-invalid': factory.errors.last}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.last }}</small>
			</div>
		</div>
		<div class="form-group">
			<textarea
				id="description"
				v-model="factory.description"
				class="form-control"
				placeholder="Write a short description about yourself"
				:class="{'is-invalid': factory.errors.description}"
				rows="6"
			/>
			<small v-if="factory.errors.description" class="small text-danger d-block">{{ factory.errors.description }}</small>
		</div>
		<template v-if="auth.signInMethod === 'password'">
			<hr>
			<p class="small text-center mt-n1">
				Fill this if you want to update your password
			</p>
			<div class="form-group">
				<input
					id="password"
					v-model="factory.password"
					placeholder="New Password"
					class="form-control"
					:type="show ? 'text' : 'password'"
					:class="{'is-invalid': factory.errors.password}"
				>
				<small v-if="factory.errors.password" class="small text-danger d-block">{{ factory.errors.password }}</small>
			</div>
			<div class="form-group">
				<input
					id="cPassword"
					v-model="factory.cPassword"
					class="form-control"
					placeholder="Confirm New Password"
					:type="show ? 'text' : 'password'"
					:class="{'is-invalid': factory.errors.cPassword}"
				>
				<small v-if="factory.errors.cPassword" class="small text-danger d-block">{{ factory.errors.cPassword }}</small>
			</div>
		</template>
		<div class="d-flex justify-content-center align-items-center gap-1">
			<button class="btn btn-danger" @click="cancel">
				Cancel
			</button>
			<button class="btn btn-primary" type="submit" :disabled="loading || !factory.valid">
				Save Profile
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, PropType } from '@nuxtjs/composition-api'
import { useUpdateProfile } from '@app/hooks/users/account'
import { useAuth, setShowProfileModal } from '@app/hooks/auth/auth'
import { usePassword } from '@app/hooks/core/forms'
export default defineComponent({
	name: 'AccountProfileForm',
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
		onBeforeUnmount(() => setShowProfileModal(false))
		return {
			auth, show, toggle,
			factory, error, loading, updateProfile
		}
	}
})
</script>

<style lang="scss" scoped>
	form {
		max-width: 42rem;
		margin: 0 auto;
	}

	label {
		box-sizing: border-box;
		border-radius: 0.375rem;
		border: 1px solid $color-line;
		font-size: 1.125rem;
		text-align: center;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input, textarea {
		background: $color-white;
		color: $color-sub;
		border-radius: 0.375rem;
		border: 1px solid $color-line;
		font-size: 1.125rem;
		outline: none;
		min-height: 3rem;
		padding: 1rem;
		padding-left: 24px !important;
	}

	button {
		display: grid;
		place-items: center;
		outline: none;
		border-radius: 6px;
		border: none;
		font-size: 24px;
		color: white;
		margin: 0 12px;
	}
</style>
