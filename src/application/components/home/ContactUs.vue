<template>
	<div class="py-5">
		<div class="d-flex flex-column col-lg-10 offset-lg-1 inner-wrapper">
			<Heading variant="2" class="text-center mx-1-25 mb-2 text-primary-dark">
				Get in touch with us
			</Heading>
			<div class="position-relative">
				<img src="@app/assets/images/homepage/yellow_bubble.svg" class="ImageBubble">
				<div class="d-flex flex-column flex-column gap-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3 px-1-25">
					<MessageForm class="cardform" />
					<div class="cardform fw-bold p-1 flex-column gap-1 flex-md-row d-flex align-items-center">
						<div class="w-100 flex-grow-1 d-flex align-items-center gap-0-5">
							<img src="@app/assets/images/homepage/call.svg" height="30">
							<a href="tel:+1 800 STRANERD">+1 800 STRANERD</a>
						</div>
						<div class="w-100 flex-grow-1 d-flex align-items-center gap-0-5">
							<img src="@app/assets/images/homepage/message.svg" height="30">
							<a href="mailto:support@stranerd.com">support@stranerd.com</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MessageForm from '@app/components/forms/MessageForm.vue'
export default defineComponent({
	name: 'ContactUs',
	components: { MessageForm }
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
