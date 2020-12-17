<template>
	<form @submit.prevent="submit">
		<div class="form-group my-2">
			<label class="label">Description</label>
			<input
				v-model="factory.description"
				class="form-control"
				placeholder="Challenge name"
				:class="{'is-invalid': factory.errors.description, 'is-valid': factory.isValid('description')}"
			>
			<small v-if="factory.errors.description" class="small text-danger d-block">{{ factory.errors.description }}</small>
		</div>
		<hr>
		<div class="d-flex justify-content-end my-2">
			<button class="btn btn-accent text-white" type="submit" :disabled="loading || !factory.valid">
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AnswerChallengeFactory } from '@modules/challenges'
export default defineComponent({
	name: 'AnswerChallengeForm',
	props: {
		factory: {
			type: AnswerChallengeFactory,
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
