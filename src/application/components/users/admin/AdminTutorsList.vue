<template>
	<div>
		<TutorsListCard v-for="tutor in tutors" :key="tutor.hash" :tutor="tutor" />
		<DisplayWarning v-if="!loading && !error && tutors.length === 0" message="No nerds found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import { useTutorsList } from '@app/hooks/users/roles/tutors'
import TutorsListCard from '@app/components/users/admin/AdminTutorsListCard.vue'
export default defineComponent({
	name: 'AdminTutorsList',
	components: { TutorsListCard },
	setup () {
		const { loading, error, tutors, listener } = useTutorsList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { loading, error, tutors }
	}
})
</script>
