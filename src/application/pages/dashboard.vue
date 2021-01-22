<template>
	<section>
		<div class="content mb-3 py-4 text-center d-none d-md-block">
			<h1 class="display-4 mb-2 font-weight-bold text-grey">
				Get your answer today
			</h1>
			<button class="btn btn-red text-white font-weight-bold rounded-pill px-6" @click="openQuestionModal">
				ASK A QUESTION
			</button>
		</div>
		<div class="content my-2">
			<QuestionsList />
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import QuestionsList from '@app/components/questions/questions/DashboardQuestionsList.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DashboardPage',
	components: { QuestionsList },
	layout: 'dashboard',
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { setCreateModalQuestion } = useCreateModal()
		return {
			openQuestionModal: () => {
				if (!isLoggedIn.value) redirect()
				else setCreateModalQuestion()
			}
		}
	}
})
</script>

<style lang="scss" scoped>
.content {
	background-color: $color-white;
	padding: 0.5rem;
	border-radius: 0.5rem;
	box-shadow: 0 3px 10px rgba($color-black, 0.1);
	@media (min-width: $md) {
		padding: 0.75rem;
		border-radius: 1rem;
	}
	@media (min-width: $lg) {
		border-radius: 1.5rem;
		padding: 1rem;
	}
}
</style>
