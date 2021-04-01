<template>
	<div>
		<div class="thin mx-n2" />
		<PageLoading v-if="loading" />
		<form class="d-flex align-items-center px-1 py-half" @submit.prevent="createTextChat">
			<input v-model="factory.content" class="form-control" placeholder="Type a message here...">
			<a class="fas fa-paperclip" @click.prevent="() => { $refs.mediaInput.value= ''; $refs.mediaInput.click() }" />
			<a class="fas fa-paper-plane" @click.prevent="() => { factory.content && createTextChat() }" />
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

<style lang="scss" scoped>
a {
	border-radius: 10rem;
	font-size: 1.25rem;
	margin-left: 1rem;
	color: $color-blue;
}
input.form-control {
	font-size: 1em;
	border: none;
	box-shadow: none;
	min-height: unset;
	padding: 0;
}
</style>
