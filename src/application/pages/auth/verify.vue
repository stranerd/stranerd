<template>
	<h1>Verify email</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useVerifyEmail } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'AuthVerifyPage',
	layout: 'auth',
	middleware: [
		({ redirect }) => {
			const { email } = useVerifyEmail()
			if (!email.value) redirect('/auth/')
		}
	],
	setup () {
		const { email, loading, error, message, verifyEmail } = useVerifyEmail()
		onMounted(verifyEmail)
		return { email, loading, error, message }
	}
})
</script>
