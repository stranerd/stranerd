<template>
	<Modal :hide-separator="true" :modal="$attrs.modal">
		<template slot="headerOption">
			<span class="text-32 fw-bold">
				Request A Session
			</span>
		</template>
		<div class="text-18 mt-n-2 bg-tags bod w-100 p-0-5 ps-1-5">
			You are requesting a session from Jerry Maguire.
		</div>

		<div class="form-group my-1 mt-4-5 d-flex flex-column gap-1-5">
			<div class="d-flex flex-column gap-0-5">
				<span class="fw-bold text-24 text-dark">
					Message
				</span>
				<span class="text-18 text-dark">
					Leave a message explaining what you want to achieve in the session
				</span>

				<QuestionEditor placeholder="Explain your homework or study problems" />
			</div>
			<div class="d-flex flex-column gap-0-5">
				<span class="fw-bold text-24 text-dark">
					Schedule
				</span>
				<span class="text-18 text-dark">
					Let the tutor know when you want the session.
				</span>
				<select class="form-select">
					<option>
						Immediate
					</option>
				</select>
			</div>

			<div class="w-100">
				<button class="btn sidebar-btn w-7 me-auto mt-1-5">
					Request
				</button>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useScheduleModal } from '@app/hooks/core/modals'
import QuestionEditor from '@app/components/core/editor/QuestionEditor.vue'

export default defineComponent({
	name: 'ListOpenings',
	components: { QuestionEditor },
	setup () {
		const goBack = () => {
			useScheduleModal().closeCreateOpening()
			useScheduleModal().openScheduleManager()
		}

		return { goBack }
	}
})
</script>

<style scooped>
.bod{
	border: 0.5px solid #D7E2EC;
	position: absolute;
    left: 0;
    right: 0;
}
	.mt {
		margin-top: 2px;
	}

	.w-7 {
		width: 10.5rem !important;
		margin-left: 0 !important;
	}

	select {
		border: 1px solid #d7e2ec !important;
		padding: 0.775rem 2.25rem 0.775rem 0.75rem !important;
	}
</style>
