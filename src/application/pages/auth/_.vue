<template>
	<div />
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { GenerateLink } from '@utils/router'
export default defineComponent({
	setup: () => {
		const signinRoute = GenerateLink({ path: '/auth/signin' })
		useContext().redirect(signinRoute)
		return {}
	}
})
</script>
