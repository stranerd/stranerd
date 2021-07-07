<template>
	<div class="progress">
		<div
			class="progress-bar"
			role="progressbar"
			:style=" `width:${current}%; background-color:${color};`"
			:aria-valuenow="current"
			aria-valuemin="0"
			aria-valuemax="100"
		>
			<!-- {{ current }}% -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'ProgressBar',
	props: {
		current: {
			type: Number,
			default: 0,
			required: true
		},
		color: {
			type: String,
			default: '#546DD3',
			required: false
		}
	}
})
</script>

<style lang="scss" scoped>
	.progress {
		width: 100%;
		background: $color-line;
		border-radius: 6px;
		height: 12px;
		font-size: 12px;

	}
	.progress-bar{
		border-radius: 50px;
	}
</style>
