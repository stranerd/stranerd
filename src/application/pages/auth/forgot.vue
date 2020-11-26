<template>
	<form @submit.prevent="resetPassword">
		<h2 class="mb-7 text-center">
			Forgot Password
		</h2>
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
		</div>
		<div class="mt-2 text-center">
			<button type="submit" class="w-100 btn btn-dark py-2" :disabled="loading || !factory.valid">
				Send Reset Email
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
		<div class="text-center mt-4">
			<BaseLink to="/auth/signin" class="label-sm">
				Return to Signin
			</BaseLink>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePasswordReset } from '@app/hooks/auth/passwords'
import { GenerateLink } from '@utils/router'
export default defineComponent({
	name: 'AuthForgotPage',
	layout: 'auth',
	middleware: [
		({ redirect }) => redirect(GenerateLink({ path: '/auth/' }))
	],
	setup () {
		const { factory, loading, resetPassword, error, message } = usePasswordReset()
		return { factory, loading, resetPassword, error, message }
	}
})
</script>

<style lang="scss" scoped>
h2{
	font-size: 2.0rem;
	color: $black;
	line-height: 1.2;
}
</style>
