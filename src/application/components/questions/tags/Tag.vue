<template>
	<div class="tag">
		{{ tag }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Tag',
	props: {
		tag: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	.tag {
		border: 1.2px solid $color-line;
		background-color: $color-tags;
		border-radius: 50px;
		color: $color-text-main;
		padding: 1px 14px;
	}
</style>
