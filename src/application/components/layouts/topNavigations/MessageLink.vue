<template>
	<NuxtLink to="/sessions" class="gap-0-5">
		<span class="position-relative">
			<img class="filter" src="@app/assets/images/icons/chat.svg" alt="">
			<i v-if="unreadMessages > 0" class="fas fa-circle text-danger position-absolute" style="top: 0; right: 0; font-size: 0.6em;" />
		</span>
	</NuxtLink>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useChatsList } from '@app/hooks/sessions/chats-list'
import { formatNumber } from '@utils/commons'
export default defineComponent({
	name: 'MessageLink',
	setup () {
		const { meta, listener } = useChatsList()
		const unreadMessages = computed({
			get: () => meta.value
				.map((m) => m.unRead.length)
				.filter((c) => !!c).length,
			set: () => {}
		})
		onMounted(() => {
			if (!listener.isRunning) listener.startListener()
		})
		return { unreadMessages, formatNumber }
	}
})
</script>
