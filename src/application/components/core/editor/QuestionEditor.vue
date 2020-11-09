<template>
	<BaseEditor
		:value="model"
		:error="error"
		:valid="valid"
		:toolbar="toolbar"
		path="questions"
		placeholder="Explain your question in full detail."
		@update:value="$emit('update:model',$event)"
	/>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseEditor from '@app/components/core/editor/BaseEditor.vue'
export default defineComponent({
	components: { BaseEditor },
	props: {
		model: {
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
	setup () {
		return {
			toolbar: [
				[{ size: ['small', 'normal', 'large', 'huge'] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ script: 'sub' }, { script: 'super' }],
				['code-block'],
				['clean']
			]
		}
	}
})
</script>
