<template>
	<Modal :hide-separator="true" :modal="$attrs.modal">
		<template slot="headerOption">
			<div class="d-flex text-primary align-items-start cursor-pointer me-0-5" @click="goBack">
				<Icon
					class-name="text-primary mt"
					size="xms"
					icon-name="arrow-left-thin"
				/>
				<span>
					Back to Schedule Manager
				</span>
			</div>
		</template>
		<template slot="title">
			<span class="text-32">
				List an opening
			</span>
		</template>
		<span class="text-18 mt-n-2">Let student know what exact time in the future you would be available to tutor.</span>

		<div class="form-group my-1 mt-2-5 d-flex flex-column gap-1-5">
			<select class="form-select">
				<option>
					Date (e.g August 1)
				</option>
			</select>
			<select class="form-select">
				<option>
					Time (e.g 9 AM)
				</option>
			</select>
			<select class="form-select">
				<option>
					Date (e.g August 1)
				</option>
			</select>
			<div class="w-100">
				<button class="btn sidebar-btn w-7 me-auto mt-1-5">
					add
				</button>
			</div>
			<div class="text-primary fw-bold">
				Aug 19 - 9 AM - 1 hour <span class="text-success"> added </span>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useScheduleModal } from '@app/hooks/core/modals'

export default defineComponent({
	name: 'ListOpenings',
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
	.mt{
		margin-top: 2px;
	}
	.w-7{
		width: 7.5rem !important;
		margin-left: 0 !important;
	}
	select{
		border: 1px solid #D7E2EC !important;
		padding: 0.775rem 2.25rem 0.775rem 0.75rem !important;
	}
</style>
