<template>
	<div class="py-md-1 px-0-5 px-md-3 px-lg-4 py-lg-1-5 d-flex flex-column align-items-center flex-lg-row gap-2">
		<form class="gap-1 gap-md-2 d-flex flex-column w-100 flex-grow-1" @submit.prevent="signup">
			<h1 class="mb-0">
				Sign Up
			</h1>
			<div class="d-flex flex-column gap-1 gap-md-2 flex-md-row">
				<div class="flew-grow-1 w-100">
					<input
						id="first"
						v-model="factory.first"
						type="text"
						name="first"
						required
						placeholder="First name"
						class="form-control"
						autocomplete="first-name"
					>
					<DynamicText v-if="factory.errors.first" class="small text-danger d-block">
						{{ factory.errors.first }}
					</DynamicText>
				</div>
				<div class="flew-grow-1 w-100">
					<input
						id="last"
						v-model="factory.last"
						type="text"
						name="last"
						required
						placeholder="Last name"
						class="form-control"
						autocomplete="last-name"
					>
					<DynamicText v-if="factory.errors.last" class="small text-danger d-block">
						{{ factory.errors.last }}
					</DynamicText>
				</div>
			</div>
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
				<DynamicText v-if="factory.errors.email" class="small text-danger d-block">
					{{ factory.errors.email }}
				</DynamicText>
			</div>
			<div>
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
				<DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText>
			</div>
			<div>
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
				<DynamicText v-if="factory.errors.cPassword" class="small text-danger d-block">
					{{ factory.errors.cPassword }}
				</DynamicText>
			</div>
			<button class="btn btn-lg btn-custom py-1 " type="submit">
				Sign Up
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
			<div class="d-flex gap-1 align-items-center">
				<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
				<span>or sign up with</span>
				<div class="flex-grow-1 border-bottom border-line" style="height: 2px;" />
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
