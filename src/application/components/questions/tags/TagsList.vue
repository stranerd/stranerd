<template>
	<div>
		<h1 class="ranking-header mb-2">
			Popular Tags
		</h1>
		<div class="d-flex flex-wrap gap-0-5">
			<TagListCard v-for="tag in tags" :key="tag.hash" :tag="tag" class="bg-white" />
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
		<DisplayWarning v-if="!loading && !error && tags.length === 0" message="No tags found." />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import TagListCard from '@app/components/questions/tags/TagListCard.vue'
import { useTagsList } from '@app/hooks/questions/tags'
export default defineComponent({
	name: 'TagsList',
	components: { TagListCard },
	setup () {
		const { loading, error, tags, listener } = useTagsList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { loading, error, tags }
	}
})
</script>

<style lang="scss" scoped>
	.ranking-header {
		text-align: center;
		font-size: 20px;
		color: $color-text-main;
	}
</style>
