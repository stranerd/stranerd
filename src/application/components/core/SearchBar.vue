<template>
	<form>
		<input class="form-control" placeholder="Search for">
		<select class="form-select form-select-sm" type="search">
			<option v-for="key in searchTerms" :key="key" :value="key">
				{{ key }}
			</option>
		</select>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
enum SEARCH_TYPES {
	Questions = 'Questions',
	Answers = 'Answers',
	Users = 'Users'
}
export default defineComponent({
	name: 'SearchBar',
	setup () {
		const search = ref('')
		const searchTerms = Object.keys(SEARCH_TYPES)
		return { search, SEARCH_TYPES, searchTerms }
	}
})
</script>

<style lang="scss" scoped>
form {
	flex-grow: 1;
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	input {
		color: inherit;
		border: none;
		outline: none;
		box-shadow: none;
		min-height: unset;
		padding: 0 0.5rem;
	}
	input:focus {
		color:inherit;
		box-shadow: none;
	}
	select {
		width: auto;
		background: inherit;
		border: none;
		padding: 0.25rem;
		color: inherit;
	}
	select:focus option {
		background: $color-blue;
		color: $color-white;
	}
}
</style>
