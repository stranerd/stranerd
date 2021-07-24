<template>
	<div>
		<img v-if="secondary" src="/images/logo-blue.svg" class="logo-img" alt="Stranerd">
		<img v-else src="/images/logo-white.svg" class="logo-img" alt="Stranerd">
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Logo',
	props: {
		secondary: {
			type: Boolean,
			default: false,
			required: false
		}
	}
})
</script>

<style lang="scss" scoped>
	.logo-img {
		height: 20px;
		@media (min-width: $md) {
			height: 30px;
		}
		@media (min-width: $lg) {
			height: 30px;
		}
	}
</style>
