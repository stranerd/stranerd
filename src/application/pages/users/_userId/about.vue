<template>
	<div v-if="user" class="page-content">
		<UserAboutCard :user="user" />
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import UserAboutCard from '@app/components/users/user/UserAboutCard.vue'
import { useUser } from '@app/hooks/users/user'
export default defineComponent({
	name: 'UserAboutPage',
	components: { UserAboutCard },
	layout: 'account',
	setup () {
		const { userId } = useRoute().value.params
		const { user } = useUser(userId)
		return { userId, user }
	}
})
</script>
