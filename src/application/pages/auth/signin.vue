<template>
	<div class="py-md-1 px-0-5 px-md-3 px-lg-4 py-lg-1-5 d-flex flex-column flex-lg-row gap-2">
		<form class="gap-2 d-flex flex-column w-100 flex-grow-1" @submit.prevent="signin">
			<h1 class="mb-0">
				Sign In
			</h1>
			<!-- TODO: add back validation errors -->
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
			<div class="text-end">
				<NuxtLink class="linkText text-decoration-none" to="/auth/forgot">
					Forgot Password
				</NuxtLink>
			</div>
			<button class="btn btn-lg btn-custom py-1 " type="submit">
				Sign In
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
			<div class="d-flex gap-1 align-items-center">
				<div class="flex-grow-1" style="border-bottom: 1px solid #c5c5c5; height: 2px;" />
				<span>or sign in with</span>
				<div class="flex-grow-1" style="border-bottom: 1px solid #c5c5c5; height: 2px;" />
			</div>
			<AuthProviders />
			<div class="d-flex align-items-center justify-content-center gap-0-25">
				<span>Not a member yet?</span>
				<NuxtLink class="linkText" to="/auth/signup">
					Sign Up
				</NuxtLink>
			</div>
		</form>
		<div class="text-center d-lg-block d-none w-100 flex-grow-1">
			<img src="@app/assets/images/auth/loginImage.svg" style="width: 100%;">
		</div>
	</div>
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
