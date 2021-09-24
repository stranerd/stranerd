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
			<div class="w-100 d-flex align-items-center justify-content-between">
				<span>Manage your openings				</span>
				<select class="form-select select">
					<option>
						Booked
					</option>
				</select>
			</div>
		</template>

		<div class="d-flex flex-column align-items-center justify-content-center gap-1 gap-md-2">
			<div class="d-flex flex-column gap-0-5 w-100">
				<div class="d-flex table-custom-style  text-dark bg-line">
					<div class="col-6">
						<span>Time</span>
					</div>
					<div class="col-4">
						<span>Status</span>
					</div>
					<div class="col-2 ">
						<span>Action</span>
					</div>
				</div>
				<div v-for="n in 2" :key="n" class="d-flex table-data-style  text-dark bg-line">
					<div class="col-6">
						<span class="text-primary-dark">Aug 19 - 9 AM - 1 hour</span>
					</div>
					<div class="col-4">
						<span class="text-primary">Booked</span>
					</div>
					<div class="col-2 text-danger">
						<span>Delete </span>
					</div>
				</div>
				<div v-for="n in 2" :key="n" class="d-flex table-data-style  text-dark bg-line">
					<div class="col-6">
						<span class="text-primary-dark">Aug 19 - 9 AM - 1 hour</span>
					</div>
					<div class="col-4">
						<span class="text-sub">Unbooked</span>
					</div>
					<div class="col-2 text-danger">
						<span>Delete </span>
					</div>
				</div>
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
			useScheduleModal().closeManageOpenings()
			useScheduleModal().openScheduleManager()
		}

		return { goBack }
	}
})
</script>

<style scooped lang="scss">
	.select {
		max-width: 9.75rem;
		background-color: #f8f8ff;
		border: 0.5px solid #d7e2ec;
	}
		.table-custom-style {
		border: 1px solid $color-primary;
		border-radius: 6px;
		font-weight: bold;
		font-size: 18px;
		padding: 1.188rem 2.281rem;
	}
		.table-data-style {
		border: 0.5px solid $color-line;
		border-radius: 6px;
		background: $color-tags;
		font-weight: 700;
		font-size: 18px;
		color: $color-dark;
		padding: 1.188rem 2.281rem;
	}
</style>
