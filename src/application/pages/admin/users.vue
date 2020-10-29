<template>
	<div>
		<UpgradeUserToAdmin />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UpgradeUserToAdmin from '@app/components/admin/users/UpgradeUserToAdmin.vue'
export default defineComponent({
	name: 'AdminUsersPage',
	components: {
		UpgradeUserToAdmin
	},
	layout: 'admin'
})
</script>
