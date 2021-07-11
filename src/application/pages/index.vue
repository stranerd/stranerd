<template>
	<div>
		<CTA />
		<IGStat />
		<div class="py-2-5 px-1 py-md-4 py-lg-5">
			<Features />
		</div>
		<div class="py-2-5 px-1 px-md-2 py-md-4 py-lg-5">
			<HowItWorks />
		</div>
		<div class="main-background py-2-5 px-1 px-md-2 py-md-4 py-lg-5">
			<Connect />
		</div>
		<div class="message py-2-5 px-1 px-md-2 py-md-4 py-lg-5 gap-4">
			<div class="message-form">
				<MessageForm />
			</div>
			<span class="d-none d-lg-inline">
				<img src="@app/assets/images/homepage/contact.svg">
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MessageForm from '@app/components/forms/MessageForm.vue'
import CTA from '@app/components/home/CTA.vue'
import IGStat from '@app/components/home/IGStat.vue'
import Features from '@app/components/home/Features.vue'
import HowItWorks from '@app/components/home/HowItWorks.vue'
import Connect from '@app/components/home/Connect.vue'
export default defineComponent({
	name: 'IndexPage',
	components: { MessageForm, CTA, IGStat, Features, HowItWorks, Connect },
	layout: 'home'
})
</script>

<style scoped lang="scss">
	.main-background {
		background: $color-primary-dark;
		color: $color-white;
	}

	.message {
		display: flex;
		align-items: center;

		& > *:first-child {
			display: flex;
			flex: 6;

			& > * {
				margin: 0 auto;
				@media (min-width: $md) { width: 80%; }
				@media (min-width: $lg) { margin-right: 0; }
			}
		}

		& > *:last-child {
			text-align: center;
			flex: 4;

			img {
				width: 60%;
			}
		}
	}
</style>
