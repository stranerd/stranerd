<template>
	<AisInstantSearch :index-name="collection" :search-client="searchClient" class="w-100">
		<AisSearchBox>
			<template
				slot="default"
				slot-scope="{ currentRefinement, isSearchStalled, refine }"
			>
				<div class="search-container gap-0-25">
					<img alt="" class="sub-icons" src="@app/assets/images/icons/search.svg">
					<input
						:value="currentRefinement"
						class="form-control"
						placeholder="Search for anything..."
						@input="(event) => { refine(event.currentTarget.value); log(event.currentTarget.value) }"
					>
				</div>

				<PageLoading v-if="isSearchStalled" />
			</template>
			<i slot="submit-icon" class="fas fa-search text-dark" />
			<i slot="reset-icon" class="fas fa-trash text-danger" />
		</AisSearchBox>
		<AisStateResults class="results">
			<template #default="{ state: { query }, results: { hits } }">
				<ul class="list-group">
					<template v-if="query.length">
						<AisHits v-if="hits.length > 0" :transform-items="transformResults">
							<template #default="{ items }">
								<li v-for="(item, index) in items" :key="item.objectID" class="list-group-item">
									<slot :index="index" :item="item" name="item" />
								</li>
							</template>
						</AisHits>
						<li v-else class="list-group-item h5 mb-0">
							No results found for <q>
								<DynamicText>{{ query }}</DynamicText>
							</q>
						</li>
						<AisPoweredBy :theme="theme" class="m-2" />
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
import { AisHits, AisInstantSearch, AisPoweredBy, AisSearchBox, AisStateResults } from 'vue-instantsearch'
import { analytics } from '@modules/core'

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
	setup (props) {
		const searchClient = algoliaSearch(algoliaConfig.appId, algoliaConfig.searchAPIKey)
		const log = (term: string) => analytics.logEvent('search', {
			search_term: term, collection: props.collection
		})
		return { searchClient, log }
	}
})
</script>

<style lang="scss" scoped>
	.search-container {
		display: flex;
		align-items: center;

		input.form-control {
			font-size: 1em;
			line-height: 1em;
			color: inherit;
			border: none;
			outline: none;
			box-shadow: none;
			min-height: unset;
			padding: 0.5em;
		}

		input.form-control:focus {
			color: inherit;
			box-shadow: none;
		}
	}

	li {
		border: none !important;
		color: $color-dark;
	}

	.results {
		position: absolute;
		border-radius: 0.75rem;
		margin: 0.5rem;
		background: $color-white;
		z-index: 3;
		white-space: normal;
		max-width: vw(90);
		box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
		right: 0.25rem;
		@media (min-width: 500px) {
			max-width: vw(75);
			right: unset;
		}
		@media (min-width: $lg) {
			max-width: vw(60);
		}
	}
</style>
