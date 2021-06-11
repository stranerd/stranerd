<template>
	<section>
		<div class="page-content p-0">
			<div class="background">
				<div class="overlay py-3 px-1-5">
					<div style="max-width: 75%;">
						<h2>
							{{ isTutor ? 'Help students out with their homework' : 'You need a Nerd...' }}
						</h2>
						<p v-if="isTutor">
							Earn coins for answering questions and hosting private sessions. Convert your coins to USD and cash out to your bank account.
						</p>
						<p v-else>
							Everyone is good at something; here, we link you up with Nerds who are experts in subjects that you need help with. Try it out now:<br>
							Ask a public question or Meet a Nerd for a 1 on 1 chat session.
						</p>
						<div class="d-flex gap-0-5 flex-column flex-md-row flex-wrap align-items-start">
							<button class="btn btn-blue rounded-pill px-2 py-0-5 fw-bold" @click="openQuestionModal">
								Ask A Question
							</button>
							<NuxtLink v-if="isTutor" to="/questions" class="btn btn-outline-blue rounded-pill px-2 py-0-5 fw-bold">
								Answer Questions
							</NuxtLink>
							<button v-if="!isTutor" class="btn btn-outline-blue rounded-pill px-2 py-0-5 fw-bold" @click="setAccountModalMeetTutor">
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
		const { isLoggedIn, isTutor } = useAuth()
		const { redirect } = useRedirectToAuth()
		const { setCreateModalQuestion } = useCreateModal()
		const { setAccountModalMeetTutor } = useAccountModal()
		return {
			isLoggedIn, isTutor, setAccountModalMeetTutor,
			openQuestionModal: () => {
				if (!isLoggedIn.value) redirect()
				else setCreateModalQuestion()
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
p { font-weight: 600; }
</style>
