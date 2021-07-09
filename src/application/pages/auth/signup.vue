<template>
	<div class="py-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 d-flex flex-column" style="margin-top: 21px;">
		<div class="d-flex flex-row col-12 py-0 px-0">
			<form class="col-md-6 col-12 px-1 d-flex flex-column" @submit.prevent="signup">
				<div class="col-12">
					<h1>
						Sign Up
					</h1>
				</div>
				<!-- TODO, factory for name and username -->
				<div class="py-2">
					<input
						id="name"
						v-model="factory.name"
						type="text"
						name="name"
						required
						placeholder="Name"
						class="form-control py-1 px-1"
						autocomplete="name"
					>
				</div>
				<div class="pb-2">
					<input
						id="username"
						v-model="factory.username"
						type="text"
						name="username"
						required
						placeholder="Username"
						class="form-control py-1 px-1"
						autocomplete="username"
					>
				</div>
				<div class="pb-2">
					<input
						id="email"
						v-model="factory.email"
						type="email"
						name="email"
						required
						placeholder="Email"
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
						class="form-control py-1 px-1"
						autocomplete="password"
					>
				</div>
				<div class="pb-2 text-center">
					<button class="btn btn btn-lg btn-custom py-1 " style="width: 100%;" type="submit">
						Sign Up
					</button>
				</div>
				<div class="pb-2 d-flex flex-row" style="align-items: center;">
					<div style="border-bottom: 1px solid #c5c5c5; height: 2px; width: 50%;" />
					<div style="width: 175px; px-1">
						<div>or sign up with</div>
					</div>
					<div style="border-bottom: 1px solid #c5c5c5; height: 2px; width: 50%;" />
				</div>
				<div class="pb-2 text-center">
					<AuthProviders />
				</div>
				<div class="pb-2 d-flex flex-row" style="align-items: center; justify-content: center;">
					<div>
						Already have an accout?
					</div>
					<div style="text-decoration: underline; margin-left: 4px;" class="linkText">
						<NuxtLink to="/auth/signin">
							Sign in
						</NuxtLink>
					</div>
				</div>
				<div class="mb-2">
					<DisplayError :error="error" />
					<PageLoading v-if="loading" />
				</div>
			</form>
			<div class="col-md-6 text-center py-0 px-2 d-md-block d-none">
				<img src="@app/assets/images/auth/signupLogo.svg" style="width: 100%; height: 600px;">
			</div>
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
		font-size: 16px;
		color: grey;
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
	}
</style>
