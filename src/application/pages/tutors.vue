<template>
	<div class="page-content my-1 my-md-2">
		<TutorsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TutorsList from '@app/components/users/tutors/TutorsList.vue'
export default defineComponent({
	name: 'TutorsPage',
	components: { TutorsList }
})
</script>
