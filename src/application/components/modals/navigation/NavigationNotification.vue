<template>
	<Navigation name="notifications" :close="closeNavigationModal">
		<template slot="header">
			Notifications
		</template>
		NavigationNotification
	</Navigation>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Navigation from '@app/components/modals/Navigation.vue'
import { useNavigationModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'NavigationNotification',
	components: { Navigation },
	setup () {
		const { closeNavigationModal } = useNavigationModal()
		return { closeNavigationModal }
	}
})
</script>
