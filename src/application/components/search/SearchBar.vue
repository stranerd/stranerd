<template>
	<form>
		<UserSearch v-if="search === SEARCH_TYPES.Users" />
		<select v-model="search" class="form-select form-select-sm" type="search">
			<option v-for="key in searchTerms" :key="key" :value="key">
				{{ key }}
			</option>
		</select>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import UserSearch from '@app/components/search/UserSearch.vue'
enum SEARCH_TYPES {
	Users = 'Users',
	Questions = 'Questions',
	Answers = 'Answers'
}
export default defineComponent({
	name: 'SearchBar',
	components: { UserSearch },
	setup () {
		const search = ref(SEARCH_TYPES.Users)
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
	/deep/ input {
		color: inherit;
		border: none;
		outline: none;
		box-shadow: none;
		min-height: unset;
		padding: 0 0.5rem;
	}
	/deep/ input:focus {
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
	select:focus {
		box-shadow: none;
		option {
			background: $color-blue;
			color: $color-white;
		}
	}
}
</style>
