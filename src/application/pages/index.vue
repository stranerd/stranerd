<template>
	<div>
		<img src="@app/assets/images/homepage/wave-bottom.svg" width="100%" style="margin-top: -2px;" class="d-lg-none" alt="">
		<CTA />
		<img src="@app/assets/images/homepage/wave-top.svg" width="100%" style="margin-bottom: -2px;" alt="">
		<IGStat />
		<img src="@app/assets/images/homepage/wave-bottom.svg" width="100%" style="margin-top: -2px;" alt="">
		<HowItWorks id="how-it-works" />
		<img src="@app/assets/images/homepage/wave-top.svg" width="100%" style="margin-bottom: -2px;" alt="">
		<Connect />
		<img src="@app/assets/images/homepage/wave-bottom.svg" width="100%" style="margin-top: -2px;" alt="">
		<ContactUs id="contact-us" />
		<img src="@app/assets/images/homepage/wave-footer.svg" width="100%" style="margin-bottom: -2px;" alt="">
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
