<template>
	<form @submit.prevent="sendSigninEmail">
		<h2 class="mb-7 text-center">
			Sign In With
		</h2>
		<AuthProviders class="mb-4" />
		<hr class="w-75 mx-auto my-4">
		<div class="text-center mb-2">
			<h3>Or send auth link to your email</h3>
			<p class="w-75 mx-auto">
				No need to manage passwords anymore. A link will be sent to your email which will be used to authenticate you.
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
		<div class="mt-2 text-center">
			<button type="submit" class="w-100 btn btn-dark py-2" :disabled="loading || !factory.valid">
				Send Email
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
	middleware: 'isNotAuthenticated',
	setup () {
		const { loading, sendSigninEmail, factory, error, message } = useSendEmailLink()
		return { factory, loading, error, sendSigninEmail, message }
	}
})
</script>

<style lang="scss" scoped>
h2{
	font-size: 2.5rem;
	color: $color-black;
	line-height: 1.2;
}
</style>
