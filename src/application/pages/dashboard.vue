<template>
	<section>
		<QuestionsList />
	</section>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
export default defineComponent({
	name: 'DashboardPage',
	components: { QuestionsList },
	layout: 'dashboard',
	setup () {
		useMeta(() => ({
			title: 'Dashboard: View all questions and answers | Stranerd'
		}))
		return {}
	},
	head: {}
})
</script>
