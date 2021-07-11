<template>
	<div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1 d-flex flex-column">
		<UpgradeUserToAdmin />
		<div>
			<AdminsList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UpgradeUserToAdmin from '@app/components/users/admin/UpgradeUserToAdmin.vue'
import AdminsList from '@app/components/users/admin/AdminsList.vue'
export default defineComponent({
	name: 'AdminUsersAdminsPage',
	components: {
		UpgradeUserToAdmin,
		AdminsList
	},
	layout: 'admin'
})
</script>
