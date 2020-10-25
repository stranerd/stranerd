<template>
	<form @submit.prevent="login">
		<h2 class="mb-7 text-center">
			Sign In With
		</h2>
		<AuthProviders class="mb-4" />
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
		<div class="form-group">
			<label class="label d-flex" for="password">
				<span>Password</span>
				<BaseLink to="/auth/forgot" class="label-sm ml-1">Forgot?</BaseLink>
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
				autocomplete="current-password"
			>
			<span v-if="factory.errors.password" class="text-danger">{{ factory.errors.password }}</span>
		</div>
		<div class="mt-2 text-center">
			<button type="submit" class="w-100 btn btn-dark py-2" :disabled="loading || !factory.valid">
				Sign In
			</button>
			<span v-if="error" class="text-danger">{{ error }}</span>
			<PageLoading v-if="loading" />
		</div>
		<div class="text-center mt-4">
			<span class="label-sm">Not a member?</span>
			<BaseLink to="/auth/signup" class="label-sm">
				Sign up now
			</BaseLink>
		</div>
		<DevLogin v-if="isDev" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import DevLogin from '@app/components/auth/DevLogin.vue'
import { usePassword } from '@app/usecases/core/forms'
import { useLoginForm } from '@app/usecases/auth/signin'
import { isDev } from '@utils/environment'
export default defineComponent({
	components: { AuthProviders, DevLogin },
	layout: 'auth',
	setup () {
		const { show, toggle } = usePassword()
		const { loading, login, factory, error } = useLoginForm()
		return {
			isDev, show, toggle,
			factory, loading, error, login
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
