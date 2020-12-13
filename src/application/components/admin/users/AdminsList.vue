<template>
	<div>
		<AdminsListCard v-for="admin in admins" :key="admin.id" :admin="admin" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAdminList } from '@app/hooks/users/roles/admins'
import AdminsListCard from '@app/components/admin/users/AdminsListCard.vue'
export default defineComponent({
	name: 'AdminsList',
	components: { AdminsListCard },
	setup () {
		const { loading, error, admins } = useAdminList()
		return { loading, error, admins }
	}
})
</script>
