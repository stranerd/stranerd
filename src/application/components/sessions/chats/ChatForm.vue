<template>
	<form class="d-flex align-items-center py-1 gap-2 px-2 bg-line" @submit.prevent="createTextChat">
		<input v-model="factory.content" class="form-control bg-white p-0-5" placeholder="Type a message here...">
		<a class="fas fa-paperclip" @click.prevent="() => { $refs.mediaInput.value= ''; $refs.mediaInput.click() }" />
		<a class="fas fa-paper-plane" @click.prevent="() => { factory.content && createTextChat() }" />
		<PageLoading v-if="loading" />
		<input ref="mediaInput" type="file" multiple class="d-none" @change.prevent="catchMultipleFiles">
	</form>
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

<style lang="scss" scoped>
	a {
		border-radius: 10rem;
		font-size: 1.25rem;
		margin-left: 1rem;
		color: $color-dark;
	}

	input.form-control {
		font-size: 1em;
		border: none;
		box-shadow: none;
	}
</style>
