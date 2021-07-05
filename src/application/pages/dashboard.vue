<template>
	<section>
		<div class="page-content p-0">
			<div class="background">
				<div class="overlay py-3 px-1-5">
					<div style="max-width: 75%;">
						<h2>Help students out with their homework</h2>
						<p>
							Earn coins for answering questions and hosting private sessions. Convert your coins to USD and cash out to your bank account.
						</p>
						<div class="d-flex gap-0-5 flex-column flex-md-row flex-wrap align-items-start">
							<button class="btn btn-blue rounded-pill px-2 py-0-5 fw-bold" @click="openQuestionModal">
								Ask A Question
							</button>
							<NuxtLink to="/questions" class="btn btn-outline-blue rounded-pill px-2 py-0-5 fw-bold">
								Answer Questions
							</NuxtLink>
							<button class="btn btn-outline-blue rounded-pill px-2 py-0-5 fw-bold" @click="openMeetTutor">
								Meet a Nerd
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-content">
			<TutorsList />
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal, useCreateModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
import TutorsList from '@app/components/users/tutors/TutorsList.vue'
export default defineComponent({
	name: 'DashboardPage',
	components: { TutorsList },
	layout: 'dashboard',
	setup () {
		const { isLoggedIn } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { openQuestion } = useCreateModal()
		const { openMeetTutor } = useAccountModal()
		return {
			isLoggedIn, openMeetTutor,
			openQuestionModal: () => {
				if (!isLoggedIn.value) redirect()
				else openQuestion()
			}
		}
	}
})
</script>

<style lang="scss" scoped>
	.background {
		background: url('../assets/images/icons/dashboard_hero.svg') no-repeat right bottom;

		@media (min-width: 600px) {
			background-position: right center;
		}
	}

	.overlay {
		background: rgba($color-white, 0.5);

		@media (min-width: 850px) { background: unset; }
	}
</style>
