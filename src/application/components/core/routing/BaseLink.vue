<template>
	<nuxt-link v-if="!useSubdomain" :to="path">
		<slot />
	</nuxt-link>
	<nuxt-link v-else-if="root && !different" :to="path">
		<slot />
	</nuxt-link>
	<a v-else-if="root && different" :href="path">
		<slot />
	</a>
	<nuxt-link v-else-if="!different" :to="path">
		<slot />
	</nuxt-link>
	<a v-else :href="path">
		<slot />
	</a>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubdomain } from '@utils/environment'
import { GenerateLink } from '@utils/router'
export default defineComponent({
	name: 'BaseLink',
	props: {
		to: {
			required: true,
			type: String
		},
		root: {
			type: Boolean,
			default: false
		},
		different: {
			type: Boolean,
			default: false
		}
	},
	setup: (props) => {
		return {
			useSubdomain,
			path: GenerateLink({ path: props.to, differentSubdomain: props.different, root: props.root })
		}
	}
})
</script>
