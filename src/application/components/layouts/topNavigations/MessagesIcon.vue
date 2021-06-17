<template>
	<NuxtLink to="/messages" class="position-relative">
		<img class="filter" src="@app/assets/images/icons/chat.svg" alt="">
		<i v-if="hasUnreadMessages" class="fas fa-circle text-danger position-absolute" style="top:0;right:0;font-size:0.6em;" />
	</NuxtLink>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useChatsList } from '@app/hooks/sessions/chats-list'
export default defineComponent({
	name: 'MessagesIcon',
	setup () {
		const { meta, listener } = useChatsList()
		onMounted(() => {
			if (listener && !listener.value) listener.startListener()
		})
		const hasUnreadMessages = computed({
			get: () => meta.value.map((m) => Object.values(m.unRead ?? {}).length).reduce((sum, n) => sum + n, 0) > 0,
			set: () => {}
		})
		return { hasUnreadMessages }
	}
})
</script>
