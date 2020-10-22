<template>
	<div />
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useRouter } from '@app/usecases/core/router'
export default defineComponent({
	setup: () => {
		const router = useRouter()
		const signinRoute = router.getLink({ path: '/auth/signin' })
		useContext().redirect(signinRoute)
		return {}
	}
})
</script>
