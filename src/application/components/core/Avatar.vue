<template>
	<img
		:src="source"
		alt=""
		:style="`width: ${size}px;height: ${size}px; border-radius: 10rem; border: 1.5px solid transparent;`"
	>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { Avatars } from '@modules/users'
export default defineComponent({
	name: 'Avatar',
	props: {
		// eslint-disable-next-line vue/require-prop-types
		src: {
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
			get: () => Avatars[props.src as keyof typeof Avatars]?.link ?? Avatars.default.link,
			set: () => {}
		})
		return { source }
	}
})
</script>
