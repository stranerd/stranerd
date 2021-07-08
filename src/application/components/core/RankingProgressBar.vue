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
		default: {
			type: Boolean,
			default: false,
			required: false
		},
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
		background: $color-text-sub;
		border-radius: 6px;
		height: 24px;
		font-size: 12px;
	}

	.progress-bar {
		border-radius: 0px;
		border-top: 1px solid $color-text-sub;
		border-bottom: 1px solid $color-text-sub;
		border-left: 1px solid $color-text-sub;
	}
</style>
