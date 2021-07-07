<template>
	<section>
		<div class="p-0">
			<div class="d-flex justify-content-between align-items-center w-100">
				<h1>Questions</h1>
				<button class="sidebar-btn btn " @click="openQuestionModal">
					<span>Buy Coins</span>
				</button>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal, useCreateModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { useRedirectToAuth } from '@app/hooks/auth/session'
export default defineComponent({
	name: 'DashboardPage',
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

</style>
