<template>
	<div class="d-flex flex-column gap-1">
		<ReportCard />
		<ReportCard />
		<ReportCard />
		<ReportCard />
		<!-- <DisplayWarning v-if="!loading && !error && user_reports.length === 0" message="No user report found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAdminsList } from '@app/hooks/users/roles/admins'
import ReportCard from '@app/components/users/reports/users/ReportCard.vue'
export default defineComponent({
	name: 'ReportsList',
	components: { ReportCard },
	setup () {
		const { loading, error, filteredAdmins } = useAdminsList()
		return { loading, error, admins: filteredAdmins }
	}
})
</script>
