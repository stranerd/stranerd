<template>
	<form @submit.prevent="signin">
		<div class="mb-2-5 text-center">
			<h1>
				Confirm Email Address
			</h1>
			<h4>
				to continue with authentication
			</h4>
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
				Continue
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</div>
		<div class="text-center mt-2">
			<NuxtLink to="/auth/" class="label-sm">
				Back To Auth Page
			</NuxtLink>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useEmailLinkSignin } from '@app/hooks/auth/signin'
export default defineComponent({
	name: 'AuthEmailRedirectPage',
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { loading, signin, factory, error, checkCachedEmail } = useEmailLinkSignin()

		onMounted(checkCachedEmail)

		return {
			factory, loading, error, signin
		}
	}
})
</script>
