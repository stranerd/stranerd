<template>
	<div>
		<PageLoading v-if="loading" />
		<form class="d-flex align-items-center mt-1" @submit.prevent="createTextChat">
			<input v-model="factory.content" class="form-control" placeholder="Enter message">
			<button v-if="factory.valid" type="submit">
				<i class="fas fa-paper-plane ml-2 text-success" />
			</button>
			<a v-else @click.prevent="() => { $refs.mediaInput.value= ''; $refs.mediaInput.click() }">
				<i class="fas fa-paperclip ml-2 text-success" />
			</a>
			<input ref="mediaInput" type="file" multiple class="d-none" @change.prevent="catchMultipleFiles">
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useCreateChat } from '@app/hooks/sessions/chats'
import { useMultipleFileInputs } from '@app/hooks/core/forms'
export default defineComponent({
	name: 'ChatForm',
	props: {
		userId: {
			type: String,
			required: true
		},
		sessionId: {
			type: String as PropType<string | undefined>,
			required: true
		}
	},
	setup (props) {
		const { createMediaChat, createTextChat, error, loading, factory } = useCreateChat(props.userId, props.sessionId)
		const { catchMultipleFiles } = useMultipleFileInputs(createMediaChat)
		return { factory, error, loading, createTextChat, catchMultipleFiles }
	}
})
</script>
