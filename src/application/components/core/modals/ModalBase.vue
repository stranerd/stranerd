<template>
	<div>
		<CreateModal />
		<EditModal />
		<MenuModal />
		<AccountModal />
		<SessionModal />
		<PaymentModal />
		<component :is="ModalTypes[modal]" v-for="modal in []" :key="modal" :close="removeFromStack(modal)" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CreateModal from '@app/components/modals/create/CreateIndex.vue'
import EditModal from '@app/components/modals/edit/EditIndex.vue'
import MenuModal from '@app/components/modals/menus/MenuIndex.vue'
import AccountModal from '@app/components/modals/account/AccountIndex.vue'
import SessionModal from '@app/components/modals/sessions/SessionIndex.vue'
import PaymentModal from '@app/components/modals/payments/PaymentIndex.vue'
import { useModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'ModalBase',
	components: {
		CreateModal,
		EditModal,
		MenuModal,
		AccountModal,
		SessionModal,
		PaymentModal
	},
	setup () {
		const { stack, ModalTypes, removeFromStack } = useModal()
		return { stack, removeFromStack, ModalTypes }
	}
})
</script>
