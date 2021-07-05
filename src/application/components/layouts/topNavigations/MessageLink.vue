<template>
	<NuxtLink to="/messages" class="gap-">
		<img src="@app/assets/images/icons/chat.svg" alt="">
		<span v-if="unreadMessages > 0" class="bg-white text-blue rounded-pill d-inline-flex align-items-center justify-content-center" style="height: 1.25em; width:1.25em;">
			{{ formatNumber(unreadMessages) }}
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
