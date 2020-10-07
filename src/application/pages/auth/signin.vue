<template>
	<form>
		<h2 class="mb-7 text-center">
			Sign In With
		</h2>
		<AuthProviders class="mb-4" />
		<div class="form-group">
			<label for="email" class="label">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				required
				class="form-control"
				autocomplete="email"
				autofocus
			>
		</div>
		<div class="form-group">
			<label class="label d-flex" for="password">
				<span>Password</span>
				<nuxt-link to="/forgot" class="label-sm ml-1">Forgot?</nuxt-link>
				<a class="label-sm ml-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
			</label>
			<input
				id="password"
				:type="show ? 'text' : 'password'"
				name="password"
				required
				class="form-control"
				autocomplete="current-password"
			>
		</div>
		<div class="mt-2">
			<button class="w-100 btn btn-dark py-2">
				Sign In
			</button>
		</div>
		<div class="text-center mt-4">
			<span class="label-sm">Not a member?</span>
			<nuxt-link to="/signup" class="label-sm">
				Sign up now
			</nuxt-link>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AuthProviders from '@/components/auth/AuthProviders.vue'
import { usePassword } from '@/usecases/core/forms'
export default defineComponent({
	components: { AuthProviders },
	layout: 'auth',
	setup () {
		const { show, toggle } = usePassword()
		return { show, toggle }
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
