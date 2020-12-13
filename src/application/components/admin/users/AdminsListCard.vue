<template>
	<div :id="admin.id">
		<div class="d-flex flex-wrap justify-content-between align-items-center mb-3">
			<div class="text-truncate mb-1">
				<p class="lead mb-0 text-wrap">
					{{ admin.name }}
				</p>
				<p class="small mb-0 text-wrap">
					{{ admin.email }}
				</p>
			</div>
			<button v-if="admin.roles.isAdmin" class="btn btn-sm text-nowrap btn-danger" @click="deAdminUser">
				Remove admin
			</button>
			<span v-else class="text-nowrap text-danger">
				Not an admin
			</span>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useAdminRoles } from '@app/hooks/users/roles/admins'
import { UserEntity } from '@modules/users'
export default defineComponent({
	name: 'AdminsListCard',
	props: {
		admin: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup (props) {
		const { loading, error, deAdminUser } = useAdminRoles()
		return {
			loading, error,
			deAdminUser: () => deAdminUser(props.admin)
		}
	}
})
</script>
