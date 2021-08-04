<template>
	<div>
		<p>
			{{ $route.params }}
		</p>
		<NuxtLink to="/auth/signup">
			Proceed to Sign up
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRoute } from '@nuxtjs/composition-api'
import { setReferrerId } from '@app/hooks/auth/signin'
import { useUser } from '@app/hooks/users/user'
export default defineComponent({
	name: 'ReferralsUserPage',
	middleware: [
		'isNotAuthenticated'
	],
	setup () {
		const { userId } = useRoute().value.params
		const { loading, error, user } = useUser(userId)
		onMounted(() => setReferrerId(userId))
		return { userId, user, loading, error }
	}
})
</script>
