<template>
	<section>
		<QuestionsList />
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
export default defineComponent({
	name: 'DashboardPage',
	components: { QuestionsList },
	layout: 'profile'
})
</script>
