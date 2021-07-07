<template>
	<client-only>
		<span @click.prevent="share">
			<slot><i class="fas fa-share-alt" /></slot>
		</span>
	</client-only>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { isClient, domain } from '@utils/environment'
export default defineComponent({
	name: 'Share',
	props: {
		title: {
			type: String,
			required: false,
			default: 'Title'
		},
		text: {
			type: String,
			required: false,
			default: 'Text'
		},
		link: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup (props) {
		const route = useRoute()
		const share = async () => {
			if (!isClient()) return
			const link = props.link || route.value.fullPath
			await window.navigator.share?.({
				url: domain + link.startsWith('/') ? link : `/${link}`,
				title: props.title,
				text: props.text
			})
		}
		return {
			canShare: isClient() && window.navigator.share,
			share
		}
	}
})
</script>
