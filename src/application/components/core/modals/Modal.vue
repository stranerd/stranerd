<template>
	<div class="modal-background">
		<div v-if="closeOnBackground" class="under" @click="closeModal" />
		<div class="modal-inner">
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
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ModalKey, useModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'Modal',
	props: {
		modal: {
			type: String as PropType<ModalKey>,
			required: false,
			default: ''
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
			useModal().removeFromStack(props.modal)
			props.close?.()
		}
		return { closeModal }
	}
})
</script>

<style lang="scss" scoped>
.modal-background{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	z-index: 1050;
	background: rgba($color-blue, 0.9);
}

.under{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.modal-inner{
	width: 100%;
	margin: auto;
	max-height: 99.9%;
	max-width: 800px;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background: $color-light-grey;
	box-shadow: 0 4px 8px $color-black;
	z-index: 1;
	overflow-y: auto;
	-ms-overflow-style: none;
	&::-webkit-scrollbar{
		display: none;
	}
	animation: slide-up 0.25s;
	position: relative;
}
@media (min-width: $sm){
	.modal-inner{
		padding: 1rem;
		width: 95%;
	}
}
@media (min-width: $md){
	.modal-inner{
		width: 90%;
		border-radius: 1rem;
	}
}
@keyframes slide-up {
	from { bottom: -100px; }
	to { bottom: 0; }
}
</style>
