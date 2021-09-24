<template>
	<div class="w-100 shadow d-flex align-items-center justify-content-center">
		<span>
			Study
		</span>
		<Icon
			class=" me-1-5"
			size="s"
			icon-name="tutors"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'Study',
	layout: 'dashboard',
	setup () {
		useMeta(() => ({
			title: 'Study | Stranerd'
		}))
		return {}
	},
	head: {}
})
</script>
