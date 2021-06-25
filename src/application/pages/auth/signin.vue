<template>
	<form @submit.prevent="signin">
		<h1 class="mb-2 text-center">
			Sign In With
		</h1>
		<AuthProviders class="mb-2" />
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
			<span v-if="factory.errors.email" class="text-danger">{{ factory.errors.email }}</span>
		</div>
		<div class="form-group mb-1">
			<label class="label d-flex align-items-end" for="password">
				<span>Password</span>
				<NuxtLink to="/auth/forgot" class="label-sm ms-0-5">Forgot?</NuxtLink>
				<a class="label-sm ms-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
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
		<div class="text-center">
			<button type="submit" class="w-100 btn btn-blue py-1" :disabled="loading || !factory.valid">
				Sign In
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
		<div class="text-center mt-2">
			<span class="label-sm">Not a member?</span>
			<NuxtLink to="/auth/signup" class="label-sm">
				Sign up now
			</NuxtLink>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AuthProviders from '@app/components/auth/AuthProviders.vue'
import { usePassword } from '@app/hooks/core/forms'
import { useEmailSignin } from '@app/hooks/auth/signin'
export default defineComponent({
	name: 'AuthSigninPage',
	components: { AuthProviders },
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { show, toggle } = usePassword()
		const { loading, signin, factory, error } = useEmailSignin()
		return { show, toggle, factory, loading, error, signin }
	}
})
</script>
