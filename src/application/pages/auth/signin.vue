<template>
	<form @submit.prevent="emailLogin">
		<h2 class="mb-7 text-center">
			Sign In With
		</h2>
		<PageLoading v-if="loading" />
		<AuthProviders class="mb-4" />
		<div class="form-group">
			<label for="email" class="label">Email</label>
			<input
				id="email"
				v-model="emailFactory.email"
				type="email"
				name="email"
				:class="{ 'is-valid': emailFactory.isValid('email'), 'is-invalid': emailFactory.errors.email }"
				required
				class="form-control"
				autocomplete="email"
				autofocus
			>
			<span v-if="emailFactory.errors.email" class="text-danger">{{ emailFactory.errors.email }}</span>
		</div>
		<div class="form-group">
			<label class="label d-flex" for="password">
				<span>Password</span>
				<BaseLink to="/auth/forgot" class="label-sm ml-1">Forgot?</BaseLink>
				<a class="label-sm ml-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
			</label>
			<input
				id="password"
				v-model="emailFactory.password"
				:type="show ? 'text' : 'password'"
				name="password"
				:class="{ 'is-valid': emailFactory.isValid('password'), 'is-invalid': emailFactory.errors.password }"
				required
				class="form-control"
				autocomplete="current-password"
			>
			<span v-if="emailFactory.errors.password" class="text-danger">{{ emailFactory.errors.password }}</span>
		</div>
		<div class="mt-2">
			<button type="submit" class="w-100 btn btn-dark py-2" :disabled="loading || !emailFactory.valid">
				Sign In
			</button>
		</div>
		<div class="text-center mt-4">
			<span class="label-sm">Not a member?</span>
			<BaseLink to="/auth/signup" class="label-sm">
				Sign up now
			</BaseLink>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import { usePassword } from '@app/usecases/core/forms'
import { useLoginForm } from '@app/usecases/auth/signin'
export default defineComponent({
	components: { AuthProviders },
	layout: 'auth',
	setup () {
		const { show, toggle } = usePassword()
		const { loading: emailLoading, login: emailLogin, factory: emailFactory } = useLoginForm()
		return {
			show, toggle,
			emailFactory, emailLogin,
			loading: computed(() => emailLoading.value)
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
