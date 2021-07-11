<template>
	<div class="progress" :class="{'progress-primary': primary}">
		<div
			class="progress-bar"
			role="progressbar"
			:style=" `width:${current}%;`"
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
			required: true
		},
		primary: {
			type: Boolean,
			default: false,
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

		.progress-bar {
			border-radius: 50px;
			background: $color-primary;
		}
	}

	.progress-primary {
		background: $color-sub;
		height: 24px;

		.progress-bar {
			background: #00f332;
			border-radius: 0;
			border-top: 1px solid $color-sub;
			border-bottom: 1px solid $color-sub;
			border-left: 1px solid $color-sub;
		}
	}
</style>
