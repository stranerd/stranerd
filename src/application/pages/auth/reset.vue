<template>
	<div class="py-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 d-flex flex-column" style="margin-top:25px;">
		<div class="d-flex flex-row col-12 py-0 px-0">
			<form class="col-md-6 d-flex flex-column mt-md-5 col-12 px-1" @submit.prevent="resetPassword">
				<div class=" col-12 d-md-block d-none">
					<h1>
						Reset Password?
					</h1>
				</div>
				<div class=" col-12 py-0 d-md-none d-block text-center">
					<h1>
						Reset Password?
					</h1>
				</div>
				<div class="py-1 pe-3  d-md-block d-none">
					<span class="textStyle">
						To reset your password, type your new password in the text field below and reset.
					</span>
				</div>
				<div class="py-1 d-md-none d-block text-center">
					<span class="textStyle">
						To reset your password, type your new password in the text field below and reset.
					</span>
				</div>
				<div class="pb-2">
					<input
						id="password"
						v-model="factory.email"
						type="password"
						name="password"
						required
						placeholder="New Password"
						class="form-control py-1 px-1"
						autocomplete="password"
					>
				</div>
				<div class="pb-2">
					<input
						id="password_confirm"
						v-model="factory.password_confirm"
						type="password"
						name="password_confirm"
						required
						placeholder="Confirm Password"
						class="form-control py-1 px-1"
						autocomplete="password"
					>
				</div>
				<div class="pb-2 text-center">
					<button class="btn btn btn-lg btn-custom py-1 " style="width: 100%;" type="submit">
						Reset Password
					</button>
				</div>
				<div class="pb-2 d-flex flex-row" style="align-items:center;justify-content:center;">
					<div class="textStyle">
						Return to
					</div>
					<div style="text-decoration:underline;margin-left:4px;">
						<NuxtLink to="/auth/signin">
							Sign In
						</NuxtLink>
					</div>
				</div>
				<div class="mb-2">
					<DisplayError :error="error" />
					<PageLoading v-if="loading" />
				</div>
			</form>
			<div class="col-md-6 text-center py-0 px-3 d-none d-md-block">
				<img src="@app/assets/images/auth/reset.svg" style="width:100%;height:600px;">
			</div>
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
		color: $color-text-main;
	}

	input {
		border: 1px solid grey;
		border-radius: 6px;
		font-size: 16px;
		color: grey;
	}

	.btn-custom {
		background-color: $color-btn;
		color: #fff;
		border: 2px solid ;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}
	.textStyle {
		color:$faded-text;
	}
</style>
