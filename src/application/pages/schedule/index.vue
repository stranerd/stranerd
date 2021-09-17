<template>
	<div>
		<div class="d-flex justify-content-between align-items-end">
			<span class="date">Tuesday, August 10</span>
			<span class="year fw-bold text-primary-dark">2021</span>
			<span class="name text-primary">Schedule Manager</span>
		</div>

		<div class="scheduler shadow w-100 p-3">
			<!-- <img src="" alt=""> -->
			<div class="d-flex gap-1">
				<div class="d-flex flex-column date_tab">
					<span>Mon</span>
					<span>9</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'QuestionsList',
	layout: 'dashboard'

})
</script>

<style lang="scss" scoped>
.date_tab{
	width:7.5rem;
	height:7.5rem;
	background: $color-primary;
}
.scheduler{
	height: 12rem;
	border-radius: 6px;

}
.date{
	font-size: 18px;
	font-size: 400;
}
.year{
	font-size:36px;;
}

</style>
