<template>
	<form>
		<input class="form-control" placeholder="Search for anything">
		<select class="form-select form-select-sm" type="search">
			<option v-for="key in SEARCH_TYPES" :key="key" :value="key">
				{{ key }}
			</option>
		</select>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
enum SEARCH_TYPES {
	Questions,
	Users
}
export default defineComponent({
	name: 'SearchBar',
	setup () {
		const search = ref('')
		return { search, SEARCH_TYPES }
	}
})
</script>

<style lang="scss" scoped>
form {
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	input {
		color: $color-white !important;
		border: none !important;
		box-shadow: none !important;
		min-height: unset;
		padding: 0 0.5rem;
	}
	select {
		width: auto;
		color: $color-white !important;
		background: inherit;
		border: none;
	}
}
</style>
