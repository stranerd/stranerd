<template>
	<div class="d-flex flex-column gap-2">
		<vc-donut
			background="white"
			foreground="#D7E2EC"
			:size="168"
			unit="px"
			:thickness="32"
			:has-legend="false"
			:sections="sections"
			:total="10000"
			:start-angle="0"
			:auto-adjust-text-size="false"
			@section-click="handleSectionClick"
		>
			<span class="score">{{ score }}</span>
		</vc-donut>
		<p class="small">
			Your Nerd Score is high.
		</p>
	</div>
</template>
<script>
export default {

	props: {
		score: {
			required: true,
			type: Number,
			default: 0

		}
	},
	computed: {
		sections () {
			return [{ value: this.score, color: '#546DD3' }]
		}
	}

}
</script>

<style lang="scss" scoped>
.score, .cdc-text{
	font-size: 2rem !important;
	font-weight: 700;
	color: $color-primary;
}
.small{
	font-size: 18px;
	color:$color-dark
}
</style>
