<template>
	<div>
		<h1 class="ranking-header mb-2">
			Popular Tags
		</h1>
		<div class="tag-body d-flex flex-wrap gap-0-5">
			<Tag v-for="tag in tags" :key="tag" :tag="tag" />
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import Tag from '@app/components/questions/tags/Tag.vue'
import { useTagsList } from '@app/hooks/questions/tags'
export default defineComponent({
	name: 'TagsList',
	components: { Tag },
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
