<template>
	<div>
		<div class="page-content">
			<h2 class="text-center">
				NERD FORM
			</h2>
			<TutorApplicationForm />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import TutorApplicationForm from '@app/components/users/tutorApplication/TutorApplicationForm.vue'
export default defineComponent({
	name: 'NerdsSignupPage',
	components: { TutorApplicationForm },
	middleware: [
		'isAuthenticated',
		({ redirect }) => {
			const { isTutor } = useAuth()
			if (isTutor.value) redirect('/')
		}
	]
})
</script>
