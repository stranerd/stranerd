<template>
	<form @submit.prevent="createMessage">
		<div class="form-group mb-1">
			<input
				id="name"
				v-model="factory.name"
				class="form-control"
				placeholder="Full Name"
				:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}"
			>
			<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.name }}</small>
		</div>
		<div class="form-group mb-1">
			<input
				id="email"
				v-model="factory.email"
				class="form-control"
				placeholder="Email..."
				:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}"
			>
			<small v-if="factory.errors.email" class="small text-danger d-block">{{ factory.errors.email }}</small>
		</div>
		<div class="form-group mb-1">
			<textarea
				id="message"
				v-model="factory.message"
				class="form-control"
				rows="4"
				:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
				placeholder="Eg I want to report a problem"
			/>
			<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
		</div>
		<button class="btn btn-primary py-0-75 fw-bold" type="submit" :disabled="loading || !factory.valid">
			<PageLoading v-if="loading" />
			<span>Send Message</span>
		</button>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateMessage } from '@app/hooks/forms/messages'
export default defineComponent({
	name: 'MessageForm',
	setup () {
		const { factory, loading, error, createMessage } = useCreateMessage()
		return { factory, loading, error, createMessage }
	}
})
</script>

<style lang="scss" scoped>
input, textarea {
	padding: 7px 12px;
	border: 2px solid $color-blue-white;
	border-radius: 6px;
}
</style>
