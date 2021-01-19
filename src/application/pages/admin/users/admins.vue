<template>
	<div class="page-content">
		<UpgradeUserToAdmin />
		<AdminsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UpgradeUserToAdmin from '@app/components/admin/users/UpgradeUserToAdmin.vue'
import AdminsList from '@app/components/admin/users/AdminsList.vue'
export default defineComponent({
	name: 'AdminUsersAdminsPage',
	components: {
		UpgradeUserToAdmin,
		AdminsList
	},
	layout: 'admin'
})
</script>
