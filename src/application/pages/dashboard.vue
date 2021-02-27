<template>
	<section>
		<div class="page-content mb-2 p-0">
			<div class="background py-6 px-3">
				<div style="max-width: 75%;">
					<h2 class="font-weight-bold">
						Nerd help is what you need.
					</h2>
					<p>
						Bringing to you the classroom method of learning from your peers. Ask a question ( public ) or Meet a nerd ( 1 on 1 private chat ).
					</p>
					<div class="d-flex flex-column flex-md-row flex-wrap align-items-start">
						<button class="mr-1 my-1 btn btn-blue rounded-pill px-4 py-1 font-weight-bold" @click="openQuestionModal">
							Ask A Question
						</button>
						<a href="#tutors" class="mr-1 my-1 btn btn-outline-blue rounded-pill px-4 py-1 font-weight-bold">
							Meet a Nerd
						</a>
					</div>
				</div>
			</div>
		</div>
		<div id="tutors" class="page-content my-2">
			Tutors List
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DashboardPage',
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
.background {
	background: url('~@app/assets/images/icons/dashboard_hero.svg') no-repeat 50px;
	@media (min-width: 450px) {
		background-position: right;
	}
}
</style>
