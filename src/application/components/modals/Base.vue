<template>
	<div>
		<CreateModal />
		<EditModal />
		<MenuModal />
		<AccountModal />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CreateModal from '@app/components/modals/create/CreateIndex.vue'
import EditModal from '@app/components/modals/edit/EditIndex.vue'
import MenuModal from '@app/components/modals/menus/MenuIndex.vue'
import AccountModal from '@app/components/modals/account/AccountIndex.vue'
export default defineComponent({
	name: 'ModalBase',
	components: {
		CreateModal,
		EditModal,
		MenuModal,
		AccountModal
	}
})
</script>
