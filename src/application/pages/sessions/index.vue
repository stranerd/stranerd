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
	name: 'SessionsPage',
	components: { ContactList },
	layout: 'chat',
	middleware: ['isAuthenticated']
})
</script>

<style lang="scss" scoped>
	.contact-messages {
		background: $color-white;
		display: none;
		justify-content: center;
		align-items: center;
		width: 70%;
		flex-grow: 1;
		@media (min-width: $lg) { display: flex; }
	}

	.contact-list {
		width: 30%;
		flex-grow: 1;
	}
</style>
