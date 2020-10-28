<template>
	<div class="modal-background">
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
		<div class="under" @click="close" />
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
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1050;
	background: #777777DD;
}

.under{
	width: 100vw;
	height: 100vh;
	position: absolute;
	left: 0;
	top: 0;
}

.modal-inner{
	width: 100vw;
	//height: 100vh;
	max-width: 800px;
	padding: 1rem;
	position: absolute;
	background: #ffffff;
	box-shadow: 0 4px 8px #000000;
	z-index: 1051;
	overflow-y: auto;
	-ms-overflow-style: none;
	&::-webkit-scrollbar{
		display: none;
	}
}
@media (min-width: $sm){
	.modal-inner{
		width: 95%;
		height: auto;
		max-height: 95%;
		border-radius: 10px;
	}
}

@media (min-width: $md){
	.modal-inner{
		width: 90%;
		max-height: 90%;
	}
}
@media (min-height: 650px){
	.modal-inner{
		height: auto;
	}
}

</style>
