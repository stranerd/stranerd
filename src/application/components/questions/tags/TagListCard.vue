<template>
	<div class="tag">
		{{ tag.name ? tag.name : tag }}
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { TagEntity } from '@modules/questions'
export default defineComponent({
	name: 'TagListCard',
	props: {
		tag: {
			type: [String, Object] as PropType<string | TagEntity>,
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
