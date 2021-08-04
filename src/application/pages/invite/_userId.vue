<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { setReferrerId } from '@app/hooks/auth/signin'
export default defineComponent({
	name: 'InviteUserPage',
	middleware: [
		'isNotAuthenticated',
		({ params, redirect }) => {
			setReferrerId(params.userId)
			redirect('/auth/signup')
		}
	]
})
</script>
