<template>
	<div v-if="isLoggedIn" class="page-content">
		<UserAboutCard :user="user" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import UserAboutCard from '@app/components/users/user/UserAboutCard.vue'
export default defineComponent({
	name: 'AccountAboutPage',
	components: { UserAboutCard },
	layout: 'account',
	setup () {
		const { user, isLoggedIn } = useAuth()
		return { user, isLoggedIn }
	}
})
</script>
