<template>
	<div class="d-flex flex-column align-items-center">
		<h1 class="mb-2 text-center">
			Verify Email
		</h1>
		<p class="text-center" style="max-width: 50ch">
			An email was just sent to {{ email }}. Follow the link to verify your account.
			If an error occured or you didn't recieve the email, click the button below to resend the email.
		</p>
		<button class="btn btn-blue" @click="verifyEmail">
			Resend Verification Email
		</button>
		<DisplaySuccess class="w-100" :message="message" />
		<PageLoading v-if="loading" />
		<DisplayError class="w-100" :error="error" />
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
