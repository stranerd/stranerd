<template>
	<NuxtLink to="/sessions" class="gap-0-5">
		<span class="position-relative">
			<img class="head-icons" src="@app/assets/images/icons/chat.svg" alt="">
			<i v-if="meta.map((m) => m.unRead.length).filter((c) => !!c).length > 0" class="fas fa-circle text-danger position-absolute" style="top: 0; right: 0; font-size: 0.6em;" />
		</span>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useChatsList } from '@app/hooks/sessions/chats-list'
export default defineComponent({
	name: 'MessageLink',
	setup () {
		const { meta, listener } = useChatsList()
		onMounted(() => {
			if (!listener.isRunning.value) listener.startListener()
		})
		return { meta }
	}
})
</script>
