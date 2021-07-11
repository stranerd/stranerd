<template>
	<div class="flex-grow-1 d-flex gap-0-25">
		<ContactList class="contact-list" />
		<div class="contact-messages">
			<span>Select a contact to message</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ContactList from '@app/components/sessions/chats/ContactList.vue'
export default defineComponent({
	name: 'MessagesPage',
	components: { ContactList },
	layout: 'chat',
	middleware: ['isAuthenticated']
})
</script>

<style lang="scss" scoped>
	.contact-messages {
		border-radius: 0 12px 12px 0;
		background: $color-white;
		display: none;
		justify-content: center;
		align-items: center;
		width: 68%;
		max-width: 1056px;
		flex-grow: 1;
		@media (min-width: $lg) { display: flex; }
	}

	.contact-list {
		border-radius: 12px;
		width: 32%;
		flex-grow: 1;
		max-width: 1056px;
		@media (min-width: $lg) { border-radius: 12px 0 0 12px; }
	}
</style>
