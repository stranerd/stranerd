<template>
	<div>
		<div class="d-flex justify-content-between align-items-end">
			<span class="date">Tuesday, August 10</span>
			<span class="year fw-bold text-primary-dark">2021</span>
			<span class="name text-primary">Schedule Manager</span>
		</div>

		<div class="scheduler shadow w-100 p-2  justify-content-between align-items-center mb-3 mt-0-5 d-none d-sm-flex">
			<Icon
				class="text-primary-dark"
				size="s"
				icon-name="arrow-left"
			/>

			<div class="d-flex gap-1">
				<div class="d-flex flex-column justify-content-center align-items-center gap-1 date_tab bg-primary">
					<span class="text-white fs-8 fw-bold">Mon</span>
					<span class="fw-bold text-white fs-7">9</span>
				</div>
				<div v-for="n in 5" :key="n" class="d-flex flex-column justify-content-center align-items-center gap-1 date_tab">
					<span class="text-primary fs-8 fw-bold">Tue</span>
					<span class="fw-bold text-primary-dark fs-7">10</span>
				</div>
			</div>
			<Icon
				class-name="text-primary-dark "
				size="s"
				icon-name="arrow-right"
			/>
		</div>

		<Calendar class="d-sm-none d-flex my-1" />

		<div class="d-flex flex-column gap-2">
			<div v-for="n in 7" :key="n" class="shadow detail_tab d-flex">
				<span class="bg-primary text-white d-flex justify-content-center align-items-center date fw-bold me-2">
					9 AM
				</span>
				<div class="d-flex flex-column  p-1-5 gap-1 justify-content-center">
					<span class=" text-18 fw-bold text-dark">
						Organic Chemistry
					</span>

					<span class="text-18 text-dark">
						I want to completely understand Substitution and elimination reactions.
					</span>
					<div class="d-flex align-items-center ">
						<span class="fw-bold text-sub">
							Session with <span class="text-primary">Tony Krum</span> </span>
						<div class="dot bg-sub mx-1" />
						<span class="text-primary-dark fw-bold">1 hour</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Calendar from '@app/components/schedule/Calendar.vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { Calendar },
	layout: 'dashboard'

})
</script>

<style lang="scss" scoped>
.dot{
	height: 6px;
	width: 6px;
	border-radius: 100%;
}
.detail_tab{
	height:9rem;
	border-radius: 12px;
		@media (max-width: $sm) {
			flex-direction: column;
			height: fit-content;
			border-radius: 0;
		}
	.date{
		width: 9rem;
		height:9rem;
		border-radius: 12px 0 0 12px;
		font-size: 1.875rem;
		@media (max-width: $sm) {
			width: 100%;
		height:4rem;
		border-radius: 12px 12px 0 0;
		}
	}
}
	.date_tab {
		width: 6.5rem;
		height: 6.5rem;
		border-radius: 12px;

		&:hover {
			box-shadow: 0 5px 10px rgba(19, 39, 64, 0.047);
		}
	}

	.scheduler {
		height: 12rem;
		border-radius: 6px;
	}

	.date {
		font-size: 18px;
		font-size: 400;
			@media (max-width: $sm) {
				font-size: 11px;
			}
	}

	.year {
		font-size: 36px;
			@media (max-width: $sm) {
				font-size: 11px;
			}
	}

	.fs-7 {
		font-size: 1.875rem;
	}

	.fs-8 {
		font-size: 1.5rem;
	}

</style>
