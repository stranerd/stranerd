<template>
	<h1>
		{{ $route }}
	</h1>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { setReferrerId } from '@app/hooks/auth/signin'
import { useUser } from '@app/hooks/users/user'
export default defineComponent({
	name: 'ReferralsUserPage',
	middleware: [
		({ route }) => setReferrerId(route.params.userId)
	],
	setup () {
		const { userId } = useRoute().value.params
		const { loading, error, user } = useUser(userId)
		return { userId, user, loading, error }
	}
})
</script>
