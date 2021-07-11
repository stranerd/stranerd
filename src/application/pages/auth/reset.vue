<template>
	<div class="py-md-1 px-0-5 px-md-3 px-lg-4 py-lg-1-5 d-flex flex-column flex-lg-row align-items-lg-center gap-2">
		<form class="gap-2 d-flex flex-column w-100 flex-grow-1" @submit.prevent="resetPassword">
			<h1 class="mb-0">
				Reset Password
			</h1>
			<!-- TODO: add logic for reset password in app -->
			<span class="textStyle mt-n1">
				To reset your password, type your new password below and reset
			</span>
			<input
				id="password"
				v-model="factory.password"
				type="password"
				name="password"
				required
				placeholder="New Password"
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
				Reset Password
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
			<img src="@app/assets/images/auth/reset.svg" style="width: 100%;">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePasswordReset } from '@app/hooks/auth/passwords'
export default defineComponent({
	name: 'AuthResetPage',
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
