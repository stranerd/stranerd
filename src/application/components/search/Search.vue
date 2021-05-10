<template>
	<AisInstantSearch :search-client="searchClient" :index-name="collection">
		<AisSearchBox>
			<div
				slot="default"
				slot-scope="{ currentRefinement, isSearchStalled, refine }"
				class="form-group mb-2 d-flex align-items-center"
			>
				<input
					placeholder="Search"
					type="search"
					class="form-control"
					:value="currentRefinement"
					@input="refine($event.currentTarget.value)"
				>
				<PageLoading v-if="isSearchStalled" />
			</div>
			<div slot="submit-icon">
				<i class="fas fa-search text-dark" />
			</div>
			<div slot="reset-icon">
				<i class="fas fa-trash text-danger" />
			</div>
		</AisSearchBox>
		<AisStateResults>
			<template #default="{ state: { query }, results: { hits } }">
				<AisHits v-if="query.length > 0 && hits.length > 0" :transform-items="transformResults">
					<template #default="{ items }">
						<div class="position-absolute rounded-xl shadow-sm m-1 bg-white resultContainer">
							<ul class="list-group text-wrap">
								<li v-for="(item, index) in items" :key="item.objectID" class="list-group-item text-wrap border-0">
									<slot name="item" :item="item" :index="index" />
								</li>
							</ul>
							<AisPoweredBy class="m-3" :theme="theme" />
						</div>
					</template>
				</AisHits>
				<p v-if="query.length && !hits.length">
					No results found for <q>{{ query }}</q>
				</p>
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
.resultContainer{
	z-index: 3;
	max-width: calc(100vw - 2rem);
}
@media (max-width: 500px){
	.resultContainer{ right: 0.25rem }
}
</style>
