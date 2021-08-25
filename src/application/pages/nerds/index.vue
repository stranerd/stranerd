<template>
	<section>
		<TutorsList />
	</section>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import TutorsList from '@app/components/users/tutors/TutorsList.vue'

export default defineComponent({
	name: 'NerdsPage',
	components: { TutorsList },
	layout: 'dashboard',
	setup () {
		useMeta(() => ({
			title: 'Meet a Nerd | Stranerd'
		}))
		return {}
	},
	head: {}
})
</script>
