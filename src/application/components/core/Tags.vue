<template>
	<div class="tags">
		{{ name }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Tags',
	props: {
		name: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	.tags {
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		border-radius: 50px;
		color: $color-text-main;
		padding: 1px 14px;
	}
</style>
