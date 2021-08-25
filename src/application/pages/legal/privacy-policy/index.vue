<template>
	<div class="px-md-2 p-1">
		<h1 class="text-dark mb-1">
			Privacy Policy
		</h1>
		<p>Last updated on <span class="fw-bold">August 3rd, 2021</span></p>

		<Introduction />
		<InfoWeCollect />
		<Protection />
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'
import InfoWeCollect from '@app/components/privacyPolicy/InfoWeCollect.vue'
import Introduction from '@app/components/privacyPolicy/Introduction.vue'
import Protection from '@app/components/privacyPolicy/Protection.vue'

export default defineComponent({
	name: 'PrivacyPolicyPage',
	components: { InfoWeCollect, Introduction, Protection },
	layout: 'home',
	setup () {
		useMeta(() => ({
			title: 'Privacy Policy | Stranerd'
		}))
	},
	head: {}
})
</script>
