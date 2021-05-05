<template>
	<div class="d-flex flex-column flex-md-row-reverse align-items-md-center justify-content-center">
		<div class="bg-blob">
			<h1>Get In Touch</h1>
			<div class="d-flex mb-2 align-items-start">
				<span>+14040435611</span>
				<span class="small-icons">
					<i class="fas fa-phone" />
				</span>
			</div>
			<div class="d-flex mb-2 align-items-start">
				<span>support@stranerd.com</span>
				<span class="small-icons">
					<i class="fas fa-envelope" />
				</span>
			</div>
			<div class="d-flex mb-2 align-items-start">
				<span>651 N, Broad Street, Suite 206 Middletown, DELAWARE, 19709</span>
				<span class="small-icons">
					<i class="fas fa-map-marker-alt" />
				</span>
			</div>
			<div class="d-flex justify-content-end fa-3x text-blue">
				<a href="https://facebook.com/officialstranerd">
					<i class="fab fa-facebook-square" />
				</a>
				<a href="https://instagram.com/officialstranerd">
					<i class="fab fa-instagram mx-4" />
				</a>
				<a href="https://twitter.com/stranerds">
					<i class="fab fa-twitter" />
				</a>
			</div>
		</div>
		<div class="form-contain">
			<h1>Send Us A Message</h1>
			<MessageForm />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MessageForm from '@app/components/forms/MessageForm.vue'
export default defineComponent({
	name: 'ContactUsPage',
	components: { MessageForm },
	layout: 'home'
})
</script>

<style lang="scss" scoped>
h1 {
	font-size: 1.5rem;
	z-index: 1;
	font-weight: 600;
	margin: 0 0 1rem;
	@media (min-width: $md) { font-size: 2.25rem; }
	@media (min-width: $lg) { font-size: 3rem; }
}
.bg-blob {
	min-height: calc(100vw * 100/124);
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	background: url('../assets/images/blobs/contact-blob.svg') center left no-repeat;
	background-size: cover;
	padding: 2rem 1rem;
	@media (min-width: $md) {
		flex-grow: 1;
		min-height: calc(50vw * 100/124);
		padding: 4rem 2rem;
		max-width: 50%;
	}
	@media (min-width: $lg) {
		padding: 4rem;
	}
	span {
		font-size: 1rem;
		z-index: 1;
		font-weight: 600;
		text-align: right;
		@media (min-width: $md) { font-size: 1.40625rem; }
		@media (min-width: $lg) { font-size: 1.875rem; }
	}
	.small-icons {
		z-index: 1;
		margin-left: 1.5em;
		border-radius: 10rem;
		background-color: $color-blue;
		color: $color-white;
		i { margin: 0.5em; }
	}
}
.form-contain {
	color: $color-light-blue;
	margin-bottom: 1rem;
	padding: 1rem;
	@media (min-width: $md) {
		padding: 2rem;
		flex-grow: 1;
	}
	@media (min-width: $lg) {
		padding-left: 4rem;
	}
	/deep/ .form-control {
		color: darken($color-light-blue, 10);
		max-width: 75ch;
	}
}
</style>
