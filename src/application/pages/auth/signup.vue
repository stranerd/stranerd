<template>
	<div class="py-md-1 px-0-5 px-md-3 px-lg-4 py-lg-1-5 d-flex flex-column flex-lg-row gap-2">
		<form class="gap-2 d-flex flex-column w-100 flex-grow-1" @submit.prevent="signup">
			<h1 class="mb-0">
				Sign Up
			</h1>
			<!-- TODO, factory for name and username -->
			<input
				id="name"
				v-model="factory.name"
				type="text"
				name="name"
				required
				placeholder="Name"
				class="form-control"
				autocomplete="name"
			>
			<input
				id="email"
				v-model="factory.email"
				type="email"
				name="email"
				required
				placeholder="Email"
				class="form-control"
				autocomplete="email"
			>
			<input
				id="password"
				v-model="factory.password"
				type="password"
				name="password"
				required
				placeholder="Password"
				class="form-control"
				autocomplete="password"
			>
			<input
				id="cPassword"
				v-model="factory.cPassword"
				type="password"
				name="cPassword"
				required
				placeholder="Confirm Password"
				class="form-control"
				autocomplete="password"
			>
			<button class="btn btn-lg btn-custom py-1 " type="submit">
				Sign Up
			</button>
			<DisplayError error="error" />
			<PageLoading v-if="loading" />
			<div class="d-flex gap-1 align-items-center">
				<div class="flex-grow-1" style="border-bottom: 1px solid #c5c5c5; height: 2px;" />
				<span>or sign up with</span>
				<div class="flex-grow-1" style="border-bottom: 1px solid #c5c5c5; height: 2px;" />
			</div>
			<AuthProviders />
			<div class="d-flex align-items-center justify-content-center gap-0-25">
				<span>Already have an accout?</span>
				<NuxtLink class="linkText" to="/auth/signin">
					Sign in
				</NuxtLink>
			</div>
		</form>
		<div class="text-center d-lg-block d-none w-100 flex-grow-1">
			<img src="@app/assets/images/auth/signupLogo.svg" style="width: 100%;">
		</div>
	</div>
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
	middleware: ['isNotAuthenticated'],
	setup () {
		const { show, toggle } = usePassword()
		const { factory, loading, error, signup } = useEmailSignup()
		return { show, toggle, factory, loading, error, signup }
	}
})
</script>
<style lang="scss" scoped>
	.headerStyle {
		font-weight: bolder;
		text-transform: none;
		color: $color-text-main;
	}

	input {
		border: 1px solid grey;
		border-radius: 6px;
		color: grey;
		padding: 1rem;
	}

	.btn-custom {
		background-color: $color-btn;
		color: #fff;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}

	.linkText {
		color: $color-main-dark;
		text-decoration: underline;
		font-weight: bold;
	}
</style>
