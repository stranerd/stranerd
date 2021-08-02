<template>
	<DynamicText class="tag text-no-wrap">
		{{ tag }}
	</DynamicText>
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
		border-radius: 50em;
		color: $color-dark;
		padding: 0.125em 1em;
	}
</style>
