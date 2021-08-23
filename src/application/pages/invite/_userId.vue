<template>
	<div />
</template>

<script lang="ts">
import { defineComponent, onMounted, useRoute, useRouter } from '@nuxtjs/composition-api'
import { setReferrerId } from '@app/hooks/auth/signin'

export default defineComponent({
	name: 'InviteUserPage',
	layout: 'auth',
	middleware: [
		'isNotAuthenticated'
	],
	setup () {
		const route = useRoute()
		const router = useRouter()
		onMounted(() => {
			setReferrerId(route.value.params.userId)
			router.replace('/auth/signup')
		})
	}
})
</script>
