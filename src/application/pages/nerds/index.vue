<template>
	<div class="page-content my-0-5 my-md-1">
		<TutorsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TutorsList from '@app/components/users/tutors/MeetTutorsList.vue'
export default defineComponent({
	name: 'TutorsPage',
	components: { TutorsList }
})
</script>
