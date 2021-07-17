<template>
	<form @submit.prevent="submit">
		<div class="form-group mb-1">
			<label for="title">One Line Summary</label>
			<input
				id="title"
				v-model="factory.title"
				class="form-control"
				placeholder="Eg. I want to report this user for ..."
				:class="{'is-invalid': factory.errors.title, 'is-valid': factory.isValid('title')}"
			>
			<small v-if="factory.errors.title" class="small text-danger d-block">{{ factory.errors.title }}</small>
		</div>
		<div class="form-group mb-1">
			<label for="message">Message</label>
			<textarea
				id="message"
				v-model="factory.message"
				class="form-control"
				rows="6"
				:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
				placeholder="Explain in full detail what happened"
			/>
			<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
		</div>
		<button class="btn btn-dark fw-bold" type="submit" :disabled="loading || !factory.valid">
			<PageLoading v-if="loading" />
			<span>Report User</span>
		</button>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { UserReportFactory } from '@modules/reports'
export default defineComponent({
	name: 'ReportForm',
	props: {
		factory: {
			type: Object as PropType<UserReportFactory>,
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
	}
})
</script>
