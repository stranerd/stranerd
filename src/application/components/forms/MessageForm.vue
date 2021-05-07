<template>
	<form @submit.prevent="createMessage">
		<div class="form-group mb-2">
			<label for="name">Full Name</label>
			<input
				id="name"
				v-model="factory.name"
				class="form-control"
				placeholder="Eg. John Doe"
				:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}"
			>
			<small v-if="factory.errors.name" class="small text-danger d-block">{{ factory.errors.name }}</small>
		</div>
		<div class="form-group mb-2">
			<label for="email">Email</label>
			<input
				id="email"
				v-model="factory.email"
				class="form-control"
				placeholder="Eg. johndoe@gmail.com"
				:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}"
			>
			<small v-if="factory.errors.email" class="small text-danger d-block">{{ factory.errors.email }}</small>
		</div>
		<div class="form-group mb-2">
			<label for="message">Message</label>
			<textarea
				id="message"
				v-model="factory.message"
				class="form-control"
				rows="6"
				:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
				placeholder="Eg I want to report a problem"
			/>
			<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
		</div>
		<button class="btn btn-blue-grey fw-bold" type="submit" :disabled="loading || !factory.valid">
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
