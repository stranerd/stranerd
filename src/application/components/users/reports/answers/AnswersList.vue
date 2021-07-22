<template>
	<div class="d-flex flex-column gap-1">
		<AnswerCard />
		<AnswerCard />
		<AnswerCard />
		<AnswerCard />
		<!-- <DisplayWarning v-if="!loading && !error && answers.length === 0" message="No Answers found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAdminsList } from '@app/hooks/users/roles/admins'
import AnswerCard from '@app/components/users/reports/answers/AnswerCard.vue'
export default defineComponent({
	name: 'AnswersList',
	components: { AnswerCard },
	setup () {
		const { loading, error, filteredAdmins } = useAdminsList()
		return { loading, error, admins: filteredAdmins }
	}
})
</script>
