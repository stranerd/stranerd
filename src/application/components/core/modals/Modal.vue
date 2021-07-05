<template>
	<ModalRoot :close="closeModal" :close-on-background="closeOnBackground" background-class="modal-background" modal-class="modal-inner">
		<div class="d-flex align-items-center justify-content-between my-1-5 px-1-5">
			<slot name="pre-icon">
				<i />
			</slot>
			<h3 class="my-0">
				<slot name="title">
					Header
				</slot>
			</h3>
			<h4 class="my-0">
				<a class="fas fa-times text-danger" @click.prevent="closeModal" />
			</h4>
		</div>
		<hr v-if="showSeparator" class="my-1-5">
		<slot>
			<p>This is the default content of the modal</p>
		</slot>
	</ModalRoot>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import ModalRoot from '@app/components/core/modals/ModalRoot.vue'
import { modal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'Modal',
	components: { ModalRoot },
	props: {
		modal: {
			type: String,
			required: true
		},
		close: {
			type: Function as PropType<() => void>,
			required: false,
			default: () => {}
		},
		showSeparator: {
			type: Boolean,
			required: false,
			default: false
		},
		closeOnBackground: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const closeModal = () => {
			modal.close(props.modal)
			props.close?.()
		}
		return { closeModal }
	}
})
</script>

<style lang="scss">
	.modal-background {
		background: rgba($color-text-main, 0.9);
	}

	.modal-inner {
		border-radius: 0.5rem;
		background: $color-light-grey;
		box-shadow: 0 4px 8px $color-black;
		animation: slide-up 0.25s;
	}

	@media (min-width: $md) {
		.modal-inner {
			border-radius: 1rem;
		}
	}

	@keyframes slide-up {
		from { bottom: -100px; }
		to { bottom: 0; }
	}
</style>
