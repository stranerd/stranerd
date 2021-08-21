<template>
	<UserReportsList />
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import UserReportsList from '@app/components/reports/users/UserReportsList.vue'

export default defineComponent({
	name: 'UserReportsAdminPage',
	components: { UserReportsList },
	setup () {
		useMeta(() => ({
			title: 'User Reports | Stranerd'
		}))
	},
	head: {}
})
</script>
