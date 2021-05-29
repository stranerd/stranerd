<template>
	<form class="d-flex flex-column gap-1 mx-auto" style="max-width: 672px" @submit.prevent="createTutorApplication">
		<div class="form-group">
			<label class="label" for="course">Course of Study</label>
			<input
				id="course"
				v-model="factory.course"
				class="form-control rounded-3"
				placeholder="Eg. Mechanical Engineering"
				:class="{'is-invalid': factory.errors.course, 'is-valid': factory.isValid('course')}"
			>
			<small v-if="factory.errors.course" class="small text-danger d-block">{{ factory.errors.course }}</small>
		</div>
		<div class="form-group">
			<label class="label" for="subject">Subject of Expertise</label>
			<SelectSubject id="subject" class="rounded-3" :show-all="false" :subject-id.sync="factory.subjectId" />
			<small v-if="factory.errors.subjectId" class="small text-danger d-block">{{ factory.errors.subjectId }}</small>
		</div>
		<div class="form-group">
			<label class="label d-block">Proof of expertise i.e it can be a picture of your school result.</label>
			<input ref="proofInput" type="file" class="d-none" accept="image/*" @change="catchProof">
			<img v-if="proofLink" :src="proofLink" class="w-100 mb-0-5 rounded-3" alt="">
			<div class="border border-file d-flex rounded-3">
				<span class="p-0-5 ps-1">{{ factory.proof ? factory.proof.name : 'No file selected' }}</span>
				<button class="btn btn-blue-grey btn-sm rounded-3 ms-auto" @click.prevent="() => { $refs.proofInput.value= ''; $refs.proofInput.click() }">
					Upload
				</button>
			</div>
			<small v-if="factory.errors.proof" class="small text-danger d-block">{{ factory.errors.proof }}</small>
		</div>
		<div class="form-group">
			<label class="label" for="about">Tell us a little about you</label>
			<textarea
				id="about"
				v-model="factory.about"
				class="form-control rounded-3"
				placeholder=""
				rows="3"
				:class="{'is-invalid': factory.errors.about, 'is-valid': factory.isValid('about')}"
			/>
			<small v-if="factory.errors.about" class="small text-danger d-block">{{ factory.errors.about }}</small>
		</div>
		<div class="form-group">
			<label class="label" for="description">Why do you want to become a Nerd on Stranerd?</label>
			<textarea
				id="description"
				v-model="factory.description"
				class="form-control rounded-3"
				placeholder=""
				rows="3"
				:class="{'is-invalid': factory.errors.description, 'is-valid': factory.isValid('description')}"
			/>
			<small v-if="factory.errors.description" class="small text-danger d-block">{{ factory.errors.description }}</small>
		</div>
		<div>
			<button type="submit" class="btn btn-blue rounded-3" :disabled="loading || !factory.valid">
				Submit
			</button>
		</div>
		<div>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useCreateTutorApplication } from '@app/hooks/users/tutorApplication'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { useFileInputs } from '@app/hooks/core/forms'
import { isClient } from '@utils/environment'
export default defineComponent({
	name: 'TutorApplicationForm',
	components: { SelectSubject },
	setup () {
		const { loading, error, createTutorApplication, factory } = useCreateTutorApplication()
		const proofLink = ref((factory.icon as any)?.link ?? '')
		const { catchFiles: catchProof } = useFileInputs(
			(file:File) => {
				factory.value.proof = file
				if (isClient()) proofLink.value = window.URL.createObjectURL(file)
			}
		)
		return { loading, error, createTutorApplication, factory, catchProof, proofLink }
	}
})
</script>

<style scoped lang="scss">
.border-file {
	border: 1px solid #9db4c1;
}
</style>
