<template>
	<form>
		<h2 class="mb-7 text-center">
			Sign Up With
		</h2>
		<AuthProviders class="mb-4" />
		<div class="form-group">
			<label for="name" class="label">Full Name</label>
			<input
				id="name"
				type="text"
				name="name"
				required
				class="form-control"
				autocomplete="name"
				autofocus
			>
		</div>
		<div class="form-group">
			<label for="email" class="label">Email</label>
			<input
				id="email"
				type="email"
				name="email"
				required
				class="form-control"
				autocomplete="email"
			>
		</div>
		<div class="form-group">
			<label for="password" class="label d-flex">
				<span>Password</span>
				<a class="label-sm ml-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
			</label>
			<input
				id="password"
				:type="show ? 'text' : 'password'"
				name="password"
				required
				class="form-control"
				autocomplete="new-password"
			>
		</div>
		<div class="form-group">
			<label for="c-password" class="label d-flex">
				<span>Confirm Password</span>
				<a class="label-sm ml-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
			</label>
			<input
				id="c-password"
				:type="show ? 'text' : 'password'"
				name="c-password"
				required
				class="form-control"
				autocomplete="new-password"
			>
		</div>
		<div class="mt-2">
			<button class="w-100 btn btn-dark py-2">
				Sign Up
			</button>
		</div>
		<div class="text-center mt-4">
			<span class="label-sm">Have an account?</span>
			<nuxt-link to="/signin" class="label-sm">
				Sign in
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
