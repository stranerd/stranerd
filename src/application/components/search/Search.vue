<template>
	<AisInstantSearch :search-client="searchClient" :index-name="collection">
		<AisSearchBox>
			<div
				slot="default"
				slot-scope="{ currentRefinement, isSearchStalled, refine }"
				class="form-group d-flex align-items-center"
			>
				<input
					placeholder="Search for"
					type="search"
					class="form-control"
					:value="currentRefinement"
					@input="refine($event.currentTarget.value)"
				>
				<PageLoading v-if="isSearchStalled" />
			</div>
			<i slot="submit-icon" class="fas fa-search text-blue" />
			<i slot="reset-icon" class="fas fa-trash text-danger" />
		</AisSearchBox>
		<AisStateResults class="results">
			<template #default="{ state: { query }, results: { hits } }">
				<ul class="list-group">
					<template v-if="query.length">
						<AisHits v-if="hits.length > 0" :transform-items="transformResults">
							<template #default="{ items }">
								<li v-for="(item, index) in items" :key="item.objectID" class="list-group-item">
									<slot name="item" :item="item" :index="index" />
								</li>
							</template>
						</AisHits>
						<li v-else class="list-group-item h5 mb-0">
							No results found for <q>{{ query }}</q>
						</li>
						<AisPoweredBy class="m-2" :theme="theme" />
					</template>
				</ul>
			</template>
		</AisStateResults>
	</AisInstantSearch>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { algoliaConfig } from '@utils/environment'
import algoliaSearch from 'algoliasearch/lite'
// @ts-ignore
import { AisStateResults, AisSearchBox, AisHits, AisPoweredBy, AisInstantSearch } from 'vue-instantsearch'
export default defineComponent({
	name: 'Search',
	components: {
		AisStateResults, AisSearchBox, AisHits, AisPoweredBy, AisInstantSearch
	},
	props: {
		collection: {
			type: String,
			required: true,
			validator: (value: string) => ['questions', 'answers', 'users'].includes(value)
		},
		theme: {
			type: String,
			default: () => 'light',
			validator: (value: string) => ['light', 'dark'].includes(value)
		},
		transformResults: {
			type: Function as PropType<((items: any[]) => any[])>,
			required: true
		}
	},
	setup () {
		const searchClient = algoliaSearch(algoliaConfig.appId, algoliaConfig.searchAPIKey)
		return { searchClient }
	}
})
</script>

<style lang="scss" scoped>
li {
	border: none !important;
	color: $color-blue;
}
.results{
	position: absolute;
	border-radius: 0.75rem;
	margin: 0.5rem;
	background: $color-white;
	z-index: 3;
	white-space: normal;
	max-width: calc(100vw - 4rem);
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
	@media (max-width: 500px){
		right: 0.25rem
	}
}
</style>
