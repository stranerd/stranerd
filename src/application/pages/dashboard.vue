<template>
	<section>
		<div class="page-content mb-2 p-0">
			<div class="background py-6 px-3">
				<div style="max-width: 75%;">
					<h2 class="font-weight-bold">
						{{ isTutor ? 'Help a student in need today!' : 'Nerd help is what you need.' }}
					</h2>
					<p v-if="isTutor">
						Earn coins for answering questions & attending sessions.<br>
						Convert your coins to USD and cash in to your bank account.
					</p>
					<p v-else>
						Bringing to you the classroom method of learning from your peers.<br>
						Ask a question ( public ) or Meet a nerd ( 1 on 1 private chat ).
					</p>
					<div class="d-flex flex-column flex-md-row flex-wrap align-items-start">
						<NuxtLink v-if="isTutor" to="/questions" class="mr-1 my-1 btn btn-blue rounded-pill px-4 py-1 font-weight-bold">
							Answer Questions
						</NuxtLink>
						<button v-if="!isTutor" class="mr-1 my-1 btn btn-blue rounded-pill px-4 py-1 font-weight-bold" @click="openQuestionModal">
							Ask A Question
						</button>
						<NuxtLink v-if="!isTutor" to="/tutors" class="mr-1 my-1 btn btn-outline-blue rounded-pill px-4 py-1 font-weight-bold">
							Meet a Nerd
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
		<div class="page-content my-2">
			<TutorsList />
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
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
		return {
			isLoggedIn, isTutor,
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
	background: url('~@app/assets/images/icons/dashboard_hero.svg') no-repeat 50px;
	@media (min-width: 450px) {
		background-position: right;
	}
}
</style>
