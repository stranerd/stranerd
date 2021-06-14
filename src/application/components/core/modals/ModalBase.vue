<template>
	<div>
		<SessionModal />
		<component :is="ModalTypes[id]" v-for="id in stack" :key="id" :modal="id" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SessionModal from '@app/components/modals/sessions/SessionIndex.vue'
import { useModal, ModalTypes } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'ModalBase',
	components: {
		SessionModal
	},
	setup () {
		const { stack } = useModal()
		return { stack, ModalTypes }
	}
})
</script>
