<template>
	<div>
		<CTA />
		<IGStat />
		<div class="py-2-5 px-1 px-md-2 py-md-4 py-lg-5">
			<HowItWorks id="how-it-works" />
		</div>
		<Connect />
		<MessageForm id="contact-us" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MessageForm from '@app/components/forms/MessageForm.vue'
import CTA from '@app/components/home/CTA.vue'
import IGStat from '@app/components/home/IGStat.vue'
import HowItWorks from '@app/components/home/HowItWorks.vue'
import Connect from '@app/components/home/Connect.vue'
export default defineComponent({
	name: 'IndexPage',
	components: { MessageForm, CTA, IGStat, HowItWorks, Connect },
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
			flex: 1;

			& > * {
				margin: 0 auto;
				@media (min-width: $md) { width: 80%; }
				@media (min-width: $lg) { margin-right: 0; max-width: 600px; }
			}
		}

		& > *:last-child {
			text-align: center;
			flex: 1;

			img {
				width: 60%;
			}
		}
	}
</style>
