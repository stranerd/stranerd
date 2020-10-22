<template>
	<nuxt-link v-if="!useSubdomain" :to="link">
		<slot />
	</nuxt-link>
	<nuxt-link v-else-if="root && !different" :to="link">
		<slot />
	</nuxt-link>
	<a v-else-if="root && different" :href="link">
		<slot />
	</a>
	<nuxt-link v-else-if="!different" :to="link">
		<slot />
	</nuxt-link>
	<a v-else :href="link">
		<slot />
	</a>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubdomain } from '@utils/enviroment'
import { useRouter } from '@app/usecases/core/router'
export default defineComponent({
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
		const { getLink } = useRouter()
		return {
			useSubdomain,
			link: getLink({ path: props.to, differentSubdomain: props.different, root: props.root })
		}
	}
})
</script>
