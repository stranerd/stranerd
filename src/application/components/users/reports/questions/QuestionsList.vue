<template>
	<div class="d-flex flex-column gap-1">
		<QuestionCard />
		<QuestionCard />
		<QuestionCard />
		<QuestionCard />
		<!-- <DisplayWarning v-if="!loading && !error && questions.length === 0" message="No questions found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAdminsList } from '@app/hooks/users/roles/admins'
import QuestionCard from '@app/components/users/reports/questions/QuestionCard.vue'
export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionCard },
	setup () {
		const { loading, error, filteredAdmins } = useAdminsList()
		return { loading, error, admins: filteredAdmins }
	}
})
</script>
