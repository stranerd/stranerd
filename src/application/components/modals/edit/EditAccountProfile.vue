<template>
	<Modal>
		<template slot="header">
			<div class="d-flex align-items-baseline justify-content-between my-3 px-3">
				<i />
				<h4 class="my-0">
					Edit Profile
				</h4>
				<a @click.prevent="closeEditModal">
					<i class="fas fa-times text-danger fa-lg" />
				</a>
			</div>
		</template>
		<form @submit.prevent="updateProfile">
			<div class="form-group my-3 d-flex flex-column align-items-center">
				<img v-if="imageLink" :src="imageLink" alt="Profile Image" class="profile-image mb-1" style="width: 150px; height:150px;">
				<input ref="image" type="file" class="d-none" accept="image/*" @change="catchImage">
				<a @click.prevent="() => { $refs.image.value= ''; $refs.image.click() }">
					<span class="text-info">Change Profile Image</span>
				</a>
				<small v-if="factory.errors.image" class="small text-danger d-block">{{ factory.errors.image }}</small>
			</div>
			<div class="form-group my-3">
				<label class="label">Your Name</label>
				<input
					v-model="factory.name"
					class="form-control"
					placeholder="Eg. John Doe"
					:class="{'is-invalid': factory.errors.name}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.name }}</small>
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
				<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
					Save Profile
				</button>
			</div>
			<PageLoading v-if="loading" class="mr-2" />
			<DisplayError :error="error" />
		</form>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useEditModal } from '@app/hooks/core/modals'
import { useUpdateProfile } from '@app/hooks/users/account'
import { useFileInputs } from '@app/hooks/core/forms'
import { isClient } from '@utils/environment'
export default defineComponent({
	name: 'EditAccountProfile',
	setup () {
		const { factory, error, loading, updateProfile } = useUpdateProfile()
		const { closeEditModal } = useEditModal()
		const imageLink = ref((factory.value.image as any)?.link)
		const { catchFiles: catchImage } = useFileInputs(
			(file:File) => {
				factory.value.image = file
				if (isClient()) imageLink.value = window.URL.createObjectURL(file)
			}
		)
		return {
			factory, error, loading, updateProfile,
			catchImage, imageLink,
			closeEditModal
		}
	}
})
</script>
