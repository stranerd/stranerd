<template>
	<div class="py-5">
		<div class="d-flex flex-column col-lg-10 offset-lg-1 inner-wrapper">
			<Heading class="text-center mx-1-25 mb-2 text-primary-dark" variant="2">
				Get in touch with us
			</Heading>
			<div class="position-relative">
				<img class="ImageBubble" src="@app/assets/images/homepage/yellow_bubble.svg">
				<div class="d-flex flex-column flex-column gap-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3 px-1-25">
					<MessageForm class="cardform" />
					<div class="cardform fw-bold p-1 flex-column gap-1 flex-md-row d-flex align-items-center">
						<div class="w-100 flex-grow-1 d-flex align-items-center gap-0-5">
							<img height="30" src="@app/assets/images/homepage/call.svg">
							<a v-if="isNigerian" href="tel:+2348130322791">+234 813 032-2791</a>
							<a v-else href="tel:+14044035611">+1 (404) 403-5611</a>
						</div>
						<div class="w-100 flex-grow-1 d-flex align-items-center gap-0-5">
							<img height="30" src="@app/assets/images/homepage/message.svg">
							<a href="mailto:support@stranerd.com">support@stranerd.com</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import MessageForm from '@app/components/forms/MessageForm.vue'
import { useAuth } from '@app/hooks/auth/auth'

export default defineComponent({
	name: 'ContactUs',
	components: { MessageForm },
	setup () {
		const isNigerian = computed({
			get: () => useAuth().location.value?.countryCode === 'NG',
			set: () => {
			}
		})
		return { isNigerian }
	}
})
</script>

<style lang="scss" scoped>
	.ImageBubble {
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		@media (min-width: $md) {
			width: 75%;
		}
		@media (min-width: $lg) {
			width: 60%;
		}

		z-index: -1;
		position: absolute;
	}

	.cardform {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		background: $color-white;
		border-radius: 10px;
	}

	.cardform:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
</style>
