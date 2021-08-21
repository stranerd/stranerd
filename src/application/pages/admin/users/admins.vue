<template>
	<div class="d-flex flex-column gap-2">
		<UpgradeUserToAdmin />
		<AdminsList />
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import UpgradeUserToAdmin from '@app/components/users/admin/UpgradeUserToAdmin.vue'
import AdminsList from '@app/components/users/admin/AdminsList.vue'

export default defineComponent({
	name: 'AdminUsersAdminsPage',
	components: {
		UpgradeUserToAdmin,
		AdminsList
	},
	layout: 'admin',
	setup () {
		useMeta(() => ({
			title: 'Admins | Stranerd'
		}))
	},
	head: {}
})
</script>
