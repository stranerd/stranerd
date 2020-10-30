<template>
	<div class="mx-auto" style="max-width:75ch;">
		<UpgradeUserToAdmin />
		<div v-for="user in admins" :key="user.id" class="mb-3">
			<div class="d-flex flex-wrap justify-content-between align-items-center">
				<div class="text-truncate mb-1">
					<p class="lead mb-0 text-wrap">
						{{ user.name }}
					</p>
					<p class="small mb-0 text-wrap">
						{{ user.email }}
					</p>
				</div>
				<button v-if="user.roles.isAdmin" class="btn btn-sm text-nowrap btn-danger" @click="deAdminUser(user)">
					Remove admin
				</button>
				<span v-else class="text-nowrap text-danger">
					Not an admin
				</span>
			</div>
		</div>
		<PageLoading v-if="listLoading || roleLoading" />
		<p v-if="listError" class="text-danger text-center my-3">
			{{ listError }}
		</p>
		<p v-if="roleError" class="text-danger text-center my-3">
			{{ roleError }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UpgradeUserToAdmin from '@app/components/admin/users/UpgradeUserToAdmin.vue'
import { useAdminList, useAdminRoles } from '@app/usecases/users/roles/admins'
export default defineComponent({
	name: 'AdminUsersAdminsPage',
	components: {
		UpgradeUserToAdmin
	},
	layout: 'admin',
	setup () {
		const { loading: listLoading, error: listError, admins } = useAdminList()
		const { loading: roleLoading, error: roleError, deAdminUser } = useAdminRoles()
		return {
			listLoading, listError, admins,
			roleLoading, roleError, deAdminUser
		}
	}
})
</script>
