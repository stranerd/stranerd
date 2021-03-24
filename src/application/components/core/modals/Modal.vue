<template>
	<div class="modal-background">
		<div class="under" @click="close" />
		<div class="modal-inner">
			<slot name="header">
				<h3>Header</h3>
			</slot>
			<hr v-if="showSeparator">
			<div :class="{'my-3': showSeparator }">
				<slot>
					<p>This is the default content of the modal</p>
				</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'Modal',
	props: {
		close: {
			type: Function,
			required: false,
			default: () => null
		},
		showSeparator: {
			type: Boolean,
			required: false,
			default: true
		}
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
	background: $color-light-grey;
	box-shadow: 0 4px 8px $color-black;
	z-index: 1;
	overflow-y: auto;
	-ms-overflow-style: none;
	&::-webkit-scrollbar{
		display: none;
	}
}
@media (min-width: $sm){
	.modal-inner{
		padding: 1rem;
		width: 95%;
		border-radius: 0.5rem;
	}
}

@media (min-width: $md){
	.modal-inner{
		width: 90%;
		border-radius: 1rem;
	}
}

</style>
