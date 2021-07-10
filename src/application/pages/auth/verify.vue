<template>
	<div class="py-md-1 px-0-5 px-md-3 px-lg-4 py-lg-1-5 d-flex flex-column flex-lg-row align-items-lg-center gap-2">
		<div class="gap-2 d-flex flex-column w-100 flex-grow-1">
			<h1 class="mb-0">
				Verify Your Email Address
			</h1>
			<span class="textStyle">
				An email was just sent to <b>{{ email }}</b>. Follow the link to verify your account.
				If an error occured or you didn't recieve the email, click the button below to resend the email.
			</span>
			<button class="btn btn-lg btn-custom py-1 " @click="verifyEmail">
				Resend Mail
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
			<div class="d-flex align-items-center justify-content-center gap-0-25">
				<span>Return to</span>
				<NuxtLink class="linkText" to="/auth/signin">
					Sign In
				</NuxtLink>
			</div>
		</div>
		<!-- TODO: fix sizing issue -->
		<span class="w-25 d-none d-lg-inline" style="flex-grow: 0.25;" />
		<div class="text-center d-lg-block d-none w-100 flex-grow-1">
			<img src="@app/assets/images/auth/verify.svg" style="width: 100%;">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useVerifyEmail } from '@app/hooks/auth/session'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'AuthVerifyPage',
	layout: 'auth',
	middleware: [
		({ redirect }) => {
			const { auth } = useAuth()
			if (!auth.value) redirect('/auth/signin')
		}
	],
	setup () {
		const { email, loading, error, message, verifyEmail } = useVerifyEmail()
		onMounted(verifyEmail)
		return { email, loading, error, message, verifyEmail }
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
		background-color: $color-btn;
		color: #fff;
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
