<template>
	<div class="px-md-2 p-1">
		<h1 class="text-dark mb-1">
			Privacy Policy
		</h1>
		<p>Last updated on <span class="fw-bold">August 3rd, 2021</span></p>

		<introduction />
		<infoWeCollect />
		<protection />
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import infoWeCollect from './infoWeCollect.vue'
import introduction from './introduction.vue'
import protection from './protection.vue'

export default defineComponent({
	name: 'PrivacyPolicy',
	components: { infoWeCollect, introduction, protection },
	layout: 'home',
	setup () {
		useMeta(() => ({
			title: 'Privacy Policy | Stranerd'
		}))
	},
	head: {}
})
</script>
