<template>
	<Modal>
		<template slot="header">
			<slot name="title">
				<h4>Title</h4>
			</slot>
		</template>
		<form class="mx-2" @submit.prevent="submit">
			<div class="form-group my-3">
				<label class="label">Name</label>
				<input
					v-model="factory.name"
					class="form-control"
					placeholder="Subject name"
					:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}"
				>
				<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.name }}</small>
			</div>
			<div class="form-group my-3">
				<input ref="iconInput" type="file" class="d-none" accept="image/*" @change="catchIcon">
				<a @click.prevent="() => { $refs.iconInput.value= ''; $refs.iconInput.click() }">
					<span v-if="factory.icon">{{ factory.icon.name }} </span>
					<span class="text-info">{{ factory.image ? 'Change' : 'Upload' }} subject icon</span>
				</a>
				<small v-if="factory.errors.icon" class="small text-danger d-block">{{ factory.errors.icon }}</small>
			</div>
			<hr>
			<div class="d-flex justify-content-end my-3">
				<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
					<PageLoading v-if="loading" class="mr-2" />
					<span><slot name="buttonText">Submit</slot></span>
				</button>
			</div>
		</form>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useFileInputs } from '@app/usecases/core/forms'
import { SubjectFactory } from '@modules/courses/domain/factories/subject'
export default defineComponent({
	name: 'SubjectForm',
	props: {
		factory: {
			type: SubjectFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		}
	},
	setup (props) {
		const { catchFiles: catchIcon } = useFileInputs(
			(file:File) => props.factory.icon = file
		)
		return { catchIcon }
	}
})
</script>
