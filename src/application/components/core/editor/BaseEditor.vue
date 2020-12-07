<template>
	<div>
		<vue-editor
			:value="value"
			use-custom-image-handler
			:placeholder="placeholder"
			:class="{'border border-danger': error, 'border border-success': valid }"
			:editor-toolbar="toolbar"
			@input="$emit('update:value',$event)"
			@image-added="handleImageUpload"
		/>
		<span v-if="error" class="small text-danger">{{ error }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VueEditor } from 'vue2-editor'
import { Notify } from '@app/hooks/core/notifications'
import { UploaderService } from '@modules/core/services/uploader'

/* const customToolBar = [
	[{ size: ['small', false, 'large', 'huge'] }],
	[{header: [false,1,2,3,4,5,6]}], ['bold', 'italic', 'underline', 'strike'],
	[{ script: 'sub' }, { script: 'super' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{align:''},{align:'center'},{align:'right'},{align:'justify'}],
	['blockquote', 'code-block'], [{ list: 'ordered' }, { list: 'bullet' }, {list:'check'}],
	[{color:[]},{background:[]}], ['link', 'image', 'video', 'formula'], ['clean']
] */

export default defineComponent({
	components: { 'vue-editor': VueEditor },
	props: {
		value: {
			required: true,
			type: String
		},
		toolbar: {
			required: true,
			type: Array
		},
		path: {
			required: true,
			type: String
		},
		placeholder: {
			required: true,
			type: String
		},
		error: {
			required: true,
			type: String
		},
		valid: {
			required: true,
			type: Boolean
		}
	},
	setup (props) {
		return {
			handleImageUpload: async (file: File, editor: any, cursorLocation: any, resetUploader: any) => {
				try {
					const res = await UploaderService.call(props.path, file)
					editor.insertEmbed(cursorLocation, 'image', res.link)
					resetUploader()
				} catch (e) { await Notify({ title: e, icon: 'error' }) }
			}
		}
	}
})
</script>

<style lang="scss">
.quillWrapper{
	background: $color-white;
	box-sizing: border-box;
	max-width: 90vw !important;
	position: relative;
	display: flex;
	flex-direction: column-reverse;
	.ql-toolbar{
		//z-index: 10;
		width: 100% !important;
		max-width: 100% !important;
		display: flex;
		align-items: stretch;
		flex-wrap: nowrap !important;
		overflow-x: auto;
		overflow-y: hidden;
		padding: 4px !important;
		.ql-formats{
			border-right: 1px solid $color-black;
			display: flex;
			margin: 4px !important;
			.ql-expanded{
				position: static;
				.ql-picker-options{
					min-width: 0;
					top: 0;
					left: 0;
					position: absolute;
				}
			}
		}
	}
}
</style>
