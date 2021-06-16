<template>
	<span class="position-relative" @click="setMenuModalAccountSidebar">
		<img src="@app/assets/images/icons/profile-icon.svg" alt="">
	</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMenuModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'ProfileIcon',
	setup () {
		const { setMenuModalAccountSidebar } = useMenuModal()
		return { setMenuModalAccountSidebar }
	}
})
</script>
