<template>
	<div class="py-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 d-flex flex-column" style="margin-top:20px;">
		<div class="d-flex flex-row col-12 py-0 px-0">
			<form class="col-md-6 col-12 d-flex flex-column mt-md-5 px-1" @submit.prevent="signin">
				<div class="mb-2 col-12">
					<h1>
						Log In
					</h1>
				</div>
				<div class="pb-2">
					<input
						id="email"
						v-model="factory.email"
						type="email"
						name="email"
						required
						placeholder="Email or Username"
						:class="{ 'is-valid': factory.isValid('email'), 'is-invalid': factory.errors.email }"
						class="form-control py-1 px-1"
						autocomplete="email"
					>
				</div>
				<div class="pb-2">
					<input
						id="password"
						v-model="factory.password"
						type="password"
						name="password"
						required
						placeholder="Password"
						:class="{ 'is-valid': factory.isValid('password'), 'is-invalid': factory.errors.password }"
						class="form-control py-1 px-1"
						autocomplete="password"
					>
				</div>
				<div class="pb-2 d-flex flex-row">
					<div class="d-flex flex-row" style="align-items:center;">
						<div class="form-check">
							<input id="flexCheckDefault" class="form-check-input" type="checkbox" value="">
							<label class="form-check-label textStyle" for="flexCheckDefault">
								Remember me
							</label>
						</div>
					</div>
					<div style="text-decoration:underline;margin-left:auto;font-weight:bold;" class="linkText">
						<NuxtLink to="/auth/forgot">
							Forgot password?
						</NuxtLink>
					</div>
				</div>
				<div class="pb-2 text-center">
					<button class="btn btn btn-lg btn-custom py-1 " style="width: 100%;" type="submit">
						Log In
					</button>
				</div>
				<div class="pb-2 d-flex flex-row" style="align-items:center;">
					<div style="border-bottom:1px solid #c5c5c5;height:2px;width:50%;" />
					<div style="width:175px; px-1" class="textStyle">
						<div>or sign In with</div>
					</div>
					<div style="border-bottom:1px solid #c5c5c5;height:2px;width:50%;" />
				</div>
				<div class="pb-2 text-center">
					<AuthProviders />
				</div>
				<div class="pb-2 d-flex flex-row" style="align-items:center;justify-content:center;">
					<div class="textStyle">
						Not a member yet?
					</div>
					<div style="text-decoration:underline;margin-left:4px;" class="linkText">
						<NuxtLink to="/auth/signup">
							Sign up
						</NuxtLink>
					</div>
				</div>
				<div class="mb-2">
					<DisplayError :error="error" />
					<PageLoading v-if="loading" />
				</div>
			</form>
			<div class="col-md-6 text-center py-2 px-2 d-none d-md-block">
				<img src="@app/assets/images/auth/loginImage.svg" style="width:100%;height:600px;">
			</div>
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
	.linkText {
		color:$color-main-dark;
	}
</style>
