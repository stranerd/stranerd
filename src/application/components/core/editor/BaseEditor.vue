<template>
	<span>
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
	</span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Notify } from '@app/hooks/core/notifications'
import { UploaderService } from '@modules/core/services/uploader'
import { isClient } from '@utils/environment'

let VueEditor = null
if (isClient()) VueEditor = require('vue2-editor').VueEditor

/* const customToolBar = [
	[{ size: ['small', false, 'large', 'huge'] }],
	[{ header: [false,1,2,3,4,5,6] }],
	['bold', 'italic', 'underline', 'strike'],
	[{ script: 'sub' }, { script: 'super' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{ align: '' },{ align: 'center' },{ align: 'right' },{ align: 'justify' }],
	['blockquote', 'code-block'],
	[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
	[{ color: [] },{ background: [] }],
	['link', 'image', 'video', 'formula'],
	['clean']
] */

export default defineComponent({
	name: 'BaseEditor',
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
	.quillWrapper {
		background: $color-white;
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: Ubuntu, Roboto, sans-serif !important;

		.ql-toolbar {
			display: flex;
			flex-wrap: nowrap;
			overflow-x: auto;
			overflow-y: hidden;
			font-family: inherit !important;
			padding: 4px 0 !important;

			.ql-formats {
				display: flex;
				padding: 8px;
				margin: 0 !important;

				.ql-expanded {
					position: static;

					.ql-picker-options {
						min-width: 0;
						top: 0;
						left: 0;
						position: absolute;
					}
				}
			}

			.ql-formats + .ql-formats {
				border-left: 1px solid $color-black;
			}
		}
	}
</style>
