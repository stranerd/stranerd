<template>
	<form @submit.prevent="signup">
		<h2 class="mb-7 text-center">
			Sign Up With
		</h2>
		<AuthProviders class="mb-4" />
		<div class="form-group">
			<label for="name" class="label">Full Name</label>
			<input
				id="name"
				v-model="factory.name"
				type="text"
				name="name"
				:class="{ 'is-valid': factory.isValid('name'), 'is-invalid': factory.errors.name }"
				required
				class="form-control"
				autocomplete="name"
				autofocus
			>
			<span v-if="factory.errors.name" class="text-danger">{{ factory.errors.name }}</span>
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
			>
			<span v-if="factory.errors.email" class="text-danger">{{ factory.errors.email }}</span>
		</div>
		<div class="form-group">
			<label for="password" class="label d-flex">
				<span>Password</span>
				<a class="label-sm ml-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
			</label>
			<input
				id="password"
				v-model="factory.password"
				:type="show ? 'text' : 'password'"
				name="password"
				:class="{ 'is-valid': factory.isValid('password'), 'is-invalid': factory.errors.password }"
				required
				class="form-control"
				autocomplete="new-password"
			>
			<span v-if="factory.errors.password" class="text-danger">{{ factory.errors.password }}</span>
		</div>
		<div class="form-group">
			<label for="c-password" class="label d-flex">
				<span>Confirm Password</span>
				<a class="label-sm ml-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
			</label>
			<input
				id="c-password"
				v-model="factory.cPassword"
				:type="show ? 'text' : 'password'"
				name="c-password"
				:class="{ 'is-valid': factory.isValid('cPassword'), 'is-invalid': factory.errors.cPassword }"
				required
				class="form-control"
				autocomplete="new-password"
			>
			<span v-if="factory.errors.cPassword" class="text-danger">{{ factory.errors.cPassword }}</span>
		</div>
		<div class="mt-2 text-center">
			<button type="submit" class="w-100 btn btn-dark py-2" :disabled="loading || !factory.valid">
				Sign Up
			</button>
			<span v-if="error" class="text-danger">{{ error }}</span>
			<PageLoading v-if="loading" />
		</div>
		<div class="text-center mt-4">
			<span class="label-sm">Have an account?</span>
			<BaseLink to="/auth/signin" class="label-sm">
				Sign in
			</BaseLink>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import { usePassword } from '@app/hooks/core/forms'
import { useEmailSignup } from '@app/hooks/auth/signin'
export default defineComponent({
	name: 'AuthSignupPage',
	components: { AuthProviders },
	layout: 'auth',
	middleware: 'isNotAuthenticated',
	setup () {
		const { show, toggle } = usePassword()
		const { factory, loading, error, signup } = useEmailSignup()
		return {
			show, toggle,
			factory, loading, error, signup
		}
	}
})
</script>

<style lang="scss" scoped>
h2{
	font-size: 2.5rem;
	color: $black;
	line-height: 1.2;
}
</style>
