<template>
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
			<label class="label d-block">Icon</label>
			<input ref="iconInput" type="file" class="d-none" accept="image/*" @change="catchIcon">
			<img v-if="iconLink" :src="iconLink" class="mr-2" height="50px" alt="">
			<span v-if="factory.icon">{{ factory.icon.name }}</span>
			<a class="text-info d-block my-1" @click.prevent="() => { $refs.iconInput.value= ''; $refs.iconInput.click() }">
				{{ factory.icon ? 'Change' : 'Upload' }} subject icon
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
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useFileInputs } from '@app/hooks/core/forms'
import { SubjectFactory } from '@modules/questions'
import { isClient } from '@utils/environment'
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
		},
		error: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const iconLink = ref((props.factory.icon as any)?.link)
		const { catchFiles: catchIcon } = useFileInputs(
			(file:File) => {
				props.factory.icon = file
				if (isClient()) iconLink.value = window.URL.createObjectURL(file)
			}
		)
		return { catchIcon, iconLink }
	}
})
</script>
