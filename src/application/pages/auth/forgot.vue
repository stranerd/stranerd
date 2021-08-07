<template>
	<form class="gap-1 gap-md-2 d-flex flex-column" @submit.prevent="resetPassword">
		<Heading variant="1" class="text-center">
			Forgot Your Password?
		</Heading>
		<span class="textStyle text-center">
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
			<DynamicText v-if="factory.errors.email" class="small text-danger d-block">
				{{ factory.errors.email }}
			</DynamicText>
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
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import { usePasswordReset } from '@app/hooks/auth/passwords'
export default defineComponent({
	name: 'AuthForgotPage',
	layout: 'auth',
	middleware: ['isNotAuthenticated'],
	setup () {
		const { factory, loading, resetPassword, error, message } = usePasswordReset()
		useMeta(() => ({
			title: 'Forgot Password | Stranerd'
		}))
		return { factory, loading, resetPassword, error, message }
	},
	head: {}
})
</script>
<style lang="scss" scoped>
	input {
		border: 1px solid $color-sub;
		border-radius: 6px;
		color: $color-sub;
		padding: 1rem;
	}

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}

	.linkText {
		color: $color-primary;
		text-decoration: underline;
		font-weight: bold;
	}
</style>
