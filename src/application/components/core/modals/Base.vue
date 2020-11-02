<template>
	<div>
		<CreateModal />
		<EditModal />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CreateModal from '@app/components/core/modals/create/CreateIndex.vue'
import EditModal from '@app/components/core/modals/edit/EditIndex.vue'
export default defineComponent({
	name: 'ModalBase',
	components: {
		CreateModal,
		EditModal
	}
})
</script>
