<template>
	<form @submit.prevent="submit">
		<div class="form-group my-2">
			<input
				v-model="factory.body"
				class="form-control"
				placeholder="Comment..."
				:class="{'is-invalid': factory.errors.body, 'is-valid': factory.isValid('body')}"
			>
			<small v-if="factory.errors.body" class="small text-danger d-block">{{ factory.errors.body }}</small>
		</div>
		<div class="d-flex justify-content-end my-2">
			<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
				<PageLoading v-if="loading" />
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { CommentFactory } from '@modules/questions'
export default defineComponent({
	name: 'CommentForm',
	props: {
		factory: {
			type: CommentFactory,
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
