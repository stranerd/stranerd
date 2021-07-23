<template>
	<form class="d-flex flex-column gap-1-5" @submit.prevent="updateProfile">
		<div class="mx-auto">
			<div class="position-relative mx-auto">
				<img
					:src="imageLink || DEFAULT_PROFILE_IMAGE"
					alt=""
					style="width: 72px; height: 72px; border-radius: 10rem; border: 1.5px solid transparent;"
				>
				<i
					v-if="imageLink"
					class="fas fa-times position-absolute rounded-pill text-danger"
					style="z-index: 1; right: 0; bottom: 0; font-size: 1.5rem;"
					@click="removeImage"
				/>
			</div>
			<DynamicText v-if="factory.errors.avatar" class="small text-danger d-block">
				{{ factory.errors.avatar }}
			</DynamicText>
		</div>
		<div class="form-group">
			<label id="uploadbtn" for="picture" class="px-3 bg-tags text-dark border border-line text-center">
				{{ imageLink ? 'Change' : 'Upload' }} Profile Picture
			</label>
			<input
				id="picture"
				class="d-none"
				type="file"
				name="file"
				accept="image/*"
				@change.prevent="catchFiles"
			>
		</div>
		<div class="form-group d-flex flex-column flex-md-row gap-1">
			<div class="flex-grow-1 w-100">
				<input
					id="fName"
					v-model="factory.first"
					class="form-control"
					placeholder="First Name"
					autocomplete="first-name"
					:class="{'is-invalid': factory.errors.first}"
				>
				<DynamicText v-if="factory.errors.first" class="small text-danger d-block">
					{{ factory.errors.first }}
				</DynamicText>
			</div>
			<div class="flex-grow-1 w-100">
				<input
					id="lName"
					v-model="factory.last"
					class="form-control"
					placeholder="Last Name"
					autocomplete="last-name"
					:class="{'is-invalid': factory.errors.last}"
				>
				<DynamicText v-if="factory.errors.last" class="small text-danger d-block">
					{{ factory.errors.last }}
				</DynamicText>
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
			<DynamicText v-if="factory.errors.description" class="small text-danger d-block">
				{{ factory.errors.description }}
			</DynamicText>
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
				<DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText>
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
				<DynamicText v-if="factory.errors.cPassword" class="small text-danger d-block">
					{{ factory.errors.cPassword }}
				</DynamicText>
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
import { defineComponent, onBeforeUnmount, PropType, ref } from '@nuxtjs/composition-api'
import { useUpdateProfile } from '@app/hooks/users/account'
import { useAuth, setShowProfileModal } from '@app/hooks/auth/auth'
import { useFileInputs, usePassword } from '@app/hooks/core/forms'
import { isClient } from '@utils/environment'
import { DEFAULT_PROFILE_IMAGE } from '@utils/constants'
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
		const imageLink = ref((factory.value.avatar as any)?.link ?? '')
		const { catchFiles } = useFileInputs((file) => {
			if (isClient()) imageLink.value = window.URL.createObjectURL(file)
			factory.value.avatar = file
		})
		const removeImage = () => {
			imageLink.value = ''
			factory.value.avatar = undefined
		}
		onBeforeUnmount(() => setShowProfileModal(false))
		return {
			auth, show, toggle, catchFiles, imageLink, removeImage,
			factory, error, loading, updateProfile, DEFAULT_PROFILE_IMAGE
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
