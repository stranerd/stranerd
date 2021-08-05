<template>
	<Donut
		background="#FFFFFF"
		foreground="#D7E2EC"
		:size="size"
		unit="px"
		:thickness="32"
		:has-legend="false"
		:sections="sections"
		:total="totalSections < total ? total : totalSections"
		:start-angle="0"
		:auto-adjust-text-size="true"
		@section-click="onClick"
	>
		<DynamicText class="score">
			{{ formatNumber(score, 1) }}
		</DynamicText>
	</Donut>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { formatNumber } from '@utils/commons'
import Donut from '@app/components/DonutChart/Donut.vue'
export default defineComponent({
	name: 'DonutChart',
	components: { Donut },
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
		const totalSections = computed({
			get: () => sections.value.map((s) => s.value).reduce((acc, v) => acc + v, 0),
			set: () => {}
		})
		return { sections, formatNumber, totalSections }
	}

})
</script>

<style lang="scss" scoped>
	.score, .cdc-text {
		font-size: 1.5rem;
		font-weight: 700;
		color: $color-primary;
	}
</style>
