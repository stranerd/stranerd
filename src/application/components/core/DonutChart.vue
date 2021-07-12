<template>
	<vc-donut
		background="white"
		foreground="#D7E2EC"
		:size="size"
		unit="px"
		:thickness="32"
		:has-legend="false"
		:sections="sections"
		:total="total"
		:start-angle="0"
		:auto-adjust-text-size="false"
		@section-click="onClick"
	>
		<span class="score">{{ score }}</span>
	</vc-donut>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'DonutChart',
	props: {
		size: {
			required: false,
			type: Number,
			default: 168
		},
		score: {
			required: true,
			type: Number,
			default: 0

		},
		total: {
			required: true,
			type: Number,
			default: 0

		},
		onClick: {
			required: false,
			type: Function as PropType<() => {}>,
			default: () => {}
		}
	},
	setup (props) {
		const sections = computed({
			get: () => [{ value: props.score, color: '#546DD3' }],
			set: () => {}
		})
		return { sections }
	}

})
</script>

<style lang="scss" scoped>
	.score, .cdc-text {
		font-size: 2rem !important;
		font-weight: 700;
		color: $color-primary;
	}
</style>
