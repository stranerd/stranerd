<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
	setup(){
		const { redirect } = useContext()
		return redirect('/signin')
	}
})
</script>
