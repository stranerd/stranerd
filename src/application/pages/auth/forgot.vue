<template>
	<div class="py-md-1 px-0-5 px-md-3 px-lg-4 py-lg-1-5 d-flex flex-column flex-lg-row align-items-center gap-2">
		<form class="gap-2 d-flex flex-column w-100 flex-grow-1" @submit.prevent="resetPassword">
			<h1 class="mb-0">
				Forgot Your Password?
			</h1>
			<span class="textStyle mt-n1">
				To reset your password, type your email address
			</span>
			<div>
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
				<small v-if="factory.errors.email" class="small text-danger d-block">{{ factory.errors.email }}</small>
			</div>
			<button class="btn btn-lg btn-custom py-1 " type="submit">
				Send Reset Mail
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
			<div class="d-flex align-items-center justify-content-center gap-0-25">
				<span>Return to</span>
				<NuxtLink class="linkText" to="/auth/signin">
					Sign In
				</NuxtLink>
			</div>
		</form>
		<div class="text-center d-lg-block d-none w-100 flex-grow-1">
			<img src="@app/assets/images/auth/forgotImage.svg" style="width: 100%;">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePasswordReset } from '@app/hooks/auth/passwords'
export default defineComponent({
	name: 'AuthForgotPage',
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, resetPassword, error, message } = usePasswordReset()
		return { factory, loading, resetPassword, error, message }
	}
})
</script>
<style lang="scss" scoped>
	.headerStyle {
		font-weight: bolder;
		text-transform: none;
		color: $color-dark;
	}

	input {
		border: 1px solid $color-sub;
		border-radius: 6px;
		color: $color-sub;
		padding: 1rem;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}

	.linkText {
		color: $color-primary-dark;
		text-decoration: underline;
		font-weight: bold;
	}
</style>
