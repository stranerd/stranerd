<template>
	<svg
		:class="[className, size]"
		:style="iconStyle"
		viewBox="0 0 24 24"
	>
		<use
			:class="light ? 'light' : 'dark'"
			v-bind="{'xlink:href':`${iconSvg}#${iconName}`}"
		/>
	</svg>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import iconSvg from '@/assets/icons/sprite.svg'

export default {
	name: 'Icon',
	props: {
		iconName: String,
		size: { type: String, default: 'xms' },
		light: Boolean,
		className: String,
		iconStyle: String
	},
	data () {
		return {
			iconSvg
		}
	}
}
</script>

<style scoped>
	.light {
		fill: '#ffffff';
	}

	.dark {
		fill: '#344563';
	}

	.xxxs {
		width: 0.25rem;
	}

	.xxs {
		width: 0.5rem;
	}

	.xms {
		width: 0.75rem;
	}

	.xs {
		width: 1rem;
	}

	.xsm {
		width: 1.25rem;
	}

	.s {
		width: 1.5rem;
	}

	.m {
		width: 2rem;
	}

	.l {
		width: 2.5rem;
	}

	.xl {
		width: 3rem;
	}

	.auto {
		width: 100%;
	}

	.location {
		color: #4ea4f4;
	}

	.paySettings {
		color: #1a32cc;
	}

	.paySchedule {
		color: #13b56a;
	}

	.approvalFlow {
		color: #eacee3;
	}

	.signatories {
		color: #490166;
	}

	.timeOff {
		color: #333;
	}

	.performance {
		color: #13b56a;
	}

	.documents {
		color: #f57a4d;
	}

	.bills {
		color: #2f80ed;
	}

</style>
