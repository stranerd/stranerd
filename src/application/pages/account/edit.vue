<template>
	<div class="d-flex flex-column gap-1">
		<h1 class="mb-0 mx-auto">
			Edit Your Profile
		</h1>
		<AccountProfileForm :cancel="cancel" />
	</div>
</template>

<script lang="ts">
import AccountProfileForm from '@app/components/users/account/AccountProfileForm.vue'
import { defineComponent, useMeta, useRouter } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'AccountEditPage',
	components: { AccountProfileForm },
	middleware: 'isAuthenticated',
	setup () {
		const router = useRouter()
		const cancel = () => router.push('/account/')
		useMeta(() => ({
			title: 'Edit Your Profile | Stranerd'
		}))
		return { cancel }
	},
	head: {}
})
</script>
