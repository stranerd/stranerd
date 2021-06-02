<template>
	<NuxtLink to="/messages" class="position-relative">
		<img src="@app/assets/images/icons/chat.svg" alt="">
		<i class="fas fa-circle text-danger position-absolute small" style="right:12px;" />
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useChatsList } from '@app/hooks/sessions/chats-list'
export default defineComponent({
	name: 'MessagesIcon',
	setup () {
		const { meta, listener } = useChatsList()
		onMounted(() => {
			if (listener && !listener.value) listener.startListener()
		})
		return { meta }
	}
})
</script>
