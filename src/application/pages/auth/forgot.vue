<template>
	<form @submit.prevent="resetPassword">
		<h1 class="mb-3-5 text-center">
			Forgot Password
		</h1>
		<div class="form-group mb-1">
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
		</div>
		<div class="text-center">
			<button type="submit" class="w-100 btn btn-blue py-1" :disabled="loading || !factory.valid">
				Send Reset Email
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
		<div class="text-center mt-1">
			<NuxtLink to="/auth/signin" class="label-sm">
				Return to Signin
			</NuxtLink>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePasswordReset } from '@app/hooks/auth/passwords'
export default defineComponent({
	name: 'AuthForgotPage',
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, resetPassword, error, message } = usePasswordReset()
		return { factory, loading, resetPassword, error, message }
	}
})
</script>
