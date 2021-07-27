<template>
	<div class="d-flex flex-column gap-1">
		<UserReportCard />
		<UserReportCard />
		<UserReportCard />
		<UserReportCard />
		<!-- <DisplayWarning v-if="!loading && !error && user_reports.length === 0" message="No user report found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserReportCard from '@app/components/reports/users/UserReportCard.vue'
export default defineComponent({
	name: 'UserReportsList',
	components: { UserReportCard }
})
</script>
