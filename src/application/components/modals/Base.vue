<template>
	<div>
		<CreateModal />
		<EditModal />
		<MenuModal />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CreateModal from '@app/components/modals/create/CreateIndex.vue'
import EditModal from '@app/components/modals/edit/EditIndex.vue'
import MenuModal from '@app/components/modals/menus/MenuIndex.vue'
export default defineComponent({
	name: 'ModalBase',
	components: {
		CreateModal,
		EditModal,
		MenuModal
	}
})
</script>
