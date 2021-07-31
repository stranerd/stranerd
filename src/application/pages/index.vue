<template>
	<div>
		<CTA />
		<IGStat />
		<HowItWorks id="how-it-works" />
		<Connect />
		<ConatctUs id="contact-us" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CTA from '@app/components/home/CTA.vue'
import IGStat from '@app/components/home/IGStat.vue'
import HowItWorks from '@app/components/home/HowItWorks.vue'
import Connect from '@app/components/home/Connect.vue'
import ConatctUs from '@app/components/home/ContactUs.vue'
export default defineComponent({
	name: 'IndexPage',
	components: { CTA, IGStat, HowItWorks, Connect, ConatctUs },
	layout: 'home'
})
</script>
