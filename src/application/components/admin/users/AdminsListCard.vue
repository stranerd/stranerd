<template>
	<div :id="admin.id">
		<div class="d-flex flex-wrap align-items-center mb-3">
			<Avatar :src="admin.avatar" :size="60" />
			<div class="text-truncate mx-1 mb-1">
				<p class="lead mb-0 text-wrap">
					{{ admin.fullName }}
				</p>
				<p class="small mb-0 text-wrap">
					{{ admin.email }}
				</p>
			</div>
			<button class="ms-auto btn btn-sm text-nowrap btn-danger" @click="deAdminUser">
				Remove admin
			</button>
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
