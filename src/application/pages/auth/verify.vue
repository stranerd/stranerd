<template>
	<div class="gap-1 gap-md-2 d-flex flex-column">
		<Heading variant="1" class="text-center">
			Verify Your Email Address
		</Heading>
		<span class="textStyle text-center">
			An email was just sent to <b><DynamicText>{{ email }}</DynamicText></b>. Follow the link to verify your account.
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
