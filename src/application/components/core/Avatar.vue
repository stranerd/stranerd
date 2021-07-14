<template>
	<img
		:src="source"
		alt=""
		:style="`width: ${size}px;height: ${size}px; border-radius: 10rem; border: 1.5px solid transparent;`"
	>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Media } from '@modules/core'
import { DEFAULT_PROFILE_IMAGE } from '@utils/constants'
export default defineComponent({
	name: 'Avatar',
	props: {
		src: {
			type: Object as PropType<Media>,
			required: true
		},
		size: {
			required: false,
			type: Number,
			default: 40
		}
	},
	setup (props) {
		const source = computed({
			get: () => props.src?.link ?? DEFAULT_PROFILE_IMAGE,
			set: () => {}
		})
		return { source }
	}
})
</script>
