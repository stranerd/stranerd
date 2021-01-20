<template>
	<div>
		<div v-if="user" class="d-lg-none page-content">
			<UserHeadCard :user="user" />
		</div>
		<NuxtChild v-if="user" />
		<div v-else class="page-content">
			<DisplayError error="No such user exists!" />
		</div>
		<div v-if="error" class="page-content">
			<DisplayError :error="error" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useUser } from '@app/hooks/users/user'
import UserHeadCard from '@app/components/users/user/UserHeadCard.vue'
export default defineComponent({
	name: 'UserSingleRootPage',
	components: { UserHeadCard },
	layout: 'users',
	setup () {
		const { route } = useContext()
		const { userId } = route.value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user }
	}
})
</script>
