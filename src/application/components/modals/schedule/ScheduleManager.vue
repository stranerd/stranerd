<template>
	<Modal :hide-separator="true" :modal="$attrs.modal">
		<template slot="title">
			<span class="text-center w-100 d-block">Schedule Manager</span>
		</template>

		<div class="d-flex flex-column gap-1">
			<div class="bg-tags w-100 d-flex flex-column justify-content-center align-items-center bord p-2">
				<Icon
					class-name="text-dark"
					size="xxxl"
					icon-name="createSchedule"
				/>

				<p class="text-center text-dark text-18">
					Let students know when you would have time to tutor. <br>
					List the openings you would have in the coming days, up to 30 days ahead.
				</p>

				<button class="btn sidebar-btn text-18" @click="openCreateOpening">
					Create Openings
				</button>
			</div>

			<div class="bg-tags w-100 d-flex flex-column justify-content-center align-items-center bord p-2">
				<Icon
					class-name="text-dark"
					size="xxxl"
					icon-name="viewOpenings"
				/>

				<p class="text-center text-dark text-18">
					Check the list of the openings you created. <br>
					Delete the opening if you would not be available to tutor anymore.
				</p>

				<button class="btn sidebar-btn text-18" @click="openManageOpenings">
					My Openings
				</button>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { useScheduleModal } from '@app/hooks/core/modals'
import { useRedirectToAuth } from '@app/hooks/auth/session'

export default defineComponent({
	name: 'ScheduleManager',
	setup () {
		const { redirect } = useRedirectToAuth()
		const { isLoggedIn } = useAuth()
		const openCreateOpening = () => {
			if (isLoggedIn.value) {
				useScheduleModal().closeScheduleManager()
				useScheduleModal().openCreateOpening()
			} else redirect()
		}
		const openManageOpenings = () => {
			if (isLoggedIn.value) {
				useScheduleModal().closeScheduleManager()
				useScheduleModal().openManageOpenings()
			} else redirect()
		}

		return { openCreateOpening, openManageOpenings }
	}
})
</script>

<style scoped>
	.bord {
		border: 0.5px solid #d7e2ec;
	}
</style>
