<template>
	<form @submit.prevent="sendSigninEmail">
		<h1 class="mb-3-5 text-center">
			Sign In With
		</h1>
		<AuthProviders class="mb-2" />
		<hr class="w-75 mx-auto my-2">
		<div class="text-center mb-1">
			<h3>Or use your email</h3>
			<p class="w-75 mx-auto">
				No need for passwords here! Enter your email below to get an authentication link sent to your email.
			</p>
		</div>
		<div class="form-group">
			<label for="email" class="label">Email</label>
			<input
				id="email"
				v-model="factory.email"
				type="email"
				name="email"
				:class="{ 'is-valid': factory.isValid('email'), 'is-invalid': factory.errors.email }"
				required
				class="form-control"
				autocomplete="email"
				autofocus
			>
			<span v-if="factory.errors.email" class="text-danger">{{ factory.errors.email }}</span>
		</div>
		<div class="mt-1 text-center">
			<button type="submit" class="w-100 btn btn-blue py-1" :disabled="loading || !factory.valid">
				Get Link
			</button>
			<DisplayError :error="error" />
			<DisplaySuccess :message="message" />
			<PageLoading v-if="loading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import { useSendEmailLink } from '@app/hooks/auth/signin'
export default defineComponent({
	name: 'AuthIndexPage',
	components: { AuthProviders },
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { loading, sendSigninEmail, factory, error, message } = useSendEmailLink()
		return { factory, loading, error, sendSigninEmail, message }
	}
})
</script>
