<template>
	<div class="flex-grow-1 d-flex gap-0-25">
		<ContactList class="contact-list" />
		<ContactListMessages :user-id="userId" class="contact-messages" />
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta, useRoute } from '@nuxtjs/composition-api'
import ContactList from '@app/components/sessions/chats/ContactList.vue'
import ContactListMessages from '@app/components/sessions/chats/ContactListMessages.vue'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'SessionPage',
	components: { ContactList, ContactListMessages },
	layout: 'chat',
	middleware: ['isAuthenticated',
		({ redirect, route }) => {
			const { id } = useAuth()
			const { userId } = route.params
			if (id.value === userId) redirect('/sessions')
		}
	],
	setup () {
		const { userId } = useRoute().value.params
		useMeta(() => ({
			title: 'Nerd Chat Session | Stranerd'
		}))
		return { userId }
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.contact-messages {
		width: 70%;
		background: url("~@app/assets/images/doodle.png") $color-white;
		flex-grow: 1;
	}

	.contact-list {
		display: none !important;
		width: 30%;
		flex-grow: 1;
		@media (min-width: $lg) { display: flex !important; }
	}
</style>
