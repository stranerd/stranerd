<template>
	<div>
		<img
			alt=""
			class="d-lg-none"
			src="@app/assets/images/homepage/wave-bottom.svg"
			style="margin-top: -2px;"
			width="100%"
		>
		<CTA />
		<img alt="" src="@app/assets/images/homepage/wave-top.svg" style="margin-bottom: -2px;" width="100%">
		<IGStat />
		<img alt="" src="@app/assets/images/homepage/wave-bottom.svg" style="margin-top: -2px;" width="100%">
		<HowItWorks id="how-it-works" />
		<img alt="" src="@app/assets/images/homepage/wave-top.svg" style="margin-bottom: -2px;" width="100%">
		<Connect />
		<img alt="" src="@app/assets/images/homepage/wave-bottom.svg" style="margin-top: -2px;" width="100%">
		<ContactUs id="contact-us" />
		<img alt="" src="@app/assets/images/homepage/wave-footer.svg" style="margin-bottom: -2px;" width="100%">
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CTA from '@app/components/home/CTA.vue'
import IGStat from '@app/components/home/IGStat.vue'
import HowItWorks from '@app/components/home/HowItWorks.vue'
import Connect from '@app/components/home/Connect.vue'
import ContactUs from '@app/components/home/ContactUs.vue'

export default defineComponent({
	name: 'IndexPage',
	components: { CTA, IGStat, HowItWorks, Connect, ContactUs },
	layout: 'home'
})
</script>
