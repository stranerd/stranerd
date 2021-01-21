<template>
	<div>
		<div v-if="isLoggedIn" class="d-lg-none page-content">
			<AccountHeadCard :user="user" />
		</div>
		<NuxtChild v-if="isLoggedIn" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import AccountHeadCard from '@app/components/users/account/AccountHeadCard.vue'
export default defineComponent({
	name: 'AccountRootPage',
	components: { AccountHeadCard },
	layout: 'account',
	setup () {
		const { isLoggedIn, user } = useAuth()
		return { isLoggedIn, user }
	}
})
</script>
