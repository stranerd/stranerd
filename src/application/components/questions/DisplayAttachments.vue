<template>
	<div>
		<a :href="current.link" target="_blank">
			<img :src="current.link" alt="" class="w-100">
		</a>
		<div class="d-flex justify-content-center flex-wrap">
			<img
				v-for="file in others"
				:key="file.index"
				:src="file.link"
				alt=""
				class="minor"
				@click="setIndex(file.index)"
			>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { Media } from '@modules/core/data/models/base'
export default defineComponent({
	name: 'DisplayAttachments',
	props: {
		attachments: {
			type: Array as PropType<Media[]>,
			required: true
		}
	},
	setup (props) {
		const index = ref(0)
		const setIndex = (val: number) => index.value = val
		const indexedAttachments = computed({
			get: () => props.attachments.map((a, i) => ({ ...a, index: i })),
			set: () => {}
		})
		const current = computed({
			get: () => indexedAttachments.value.find((a) => a.index === index.value),
			set: () => {}
		})
		const others = computed({
			get: () => indexedAttachments.value.filter((a) => a.index !== index.value),
			set: () => {}
		})
		return { current, others, setIndex }
	}
})
</script>

<style lang="scss" scoped>
.minor {
	width: clamp(60px, 20%, 150px);
	margin: 0.5rem;
}
</style>
