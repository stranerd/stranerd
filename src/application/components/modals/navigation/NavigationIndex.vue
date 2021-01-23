<template>
	<div>
		<NavigationNotification v-if="isNavigationModalNotification" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useNavigationModal } from '@app/hooks/core/modals'
import NavigationNotification from '@app/components/modals/navigation/NavigationNotification.vue'
export default defineComponent({
	name: 'NavigationModalIndex',
	components: {
		NavigationNotification
	},
	setup () {
		const { isNavigationModalNotification } = useNavigationModal()
		return { isNavigationModalNotification }
	}
})
</script>
