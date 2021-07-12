<template>
	<div :id="subject.id" class="wrapper">
		<div class="p-1 d-flex flex-row align-items-center">
			<div class="subject-custom">
				{{ subject.name }}
			</div>
			<span style="font-size: 14px;" class="ms-auto text-danger" @click.prevent="deleteSubject">
				Delete
			</span>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SubjectEntity } from '@modules/questions'
import { setCurrentSubject, useDeleteSubject } from '@app/hooks/questions/subjects'
import { useEditModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminSubjectsListCard',
	props: {
		subject: {
			type: Object as PropType<SubjectEntity>,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deleteSubject } = useDeleteSubject(props.subject)
		const openEditModal = () => {
			setCurrentSubject(props.subject)
			useEditModal().openSubject()
		}
		return { loading, error, deleteSubject, openEditModal }
	}
})
</script>
<style lang="scss" scoped>
	.subject-custom {
		font-weight: bold;
		font-size: 17px;
		color: $color-dark;
	}

	.wrapper {
		border: 1px solid $color-line;
		border-radius: 5px;
		background-color: $color-tags;
	}
</style>
