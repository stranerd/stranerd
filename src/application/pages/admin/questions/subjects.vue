<template>
	<div class="d-flex flex-column gap-2">
		<!-- TODO - add a new subject form -->
		<form class="d-flex align-items-center">
			<div style="width: 100%;">
				<input
					id="subject_name"
					name="subject_name"
					required
					placeholder="Add a new subject"
					class="form-control py-1 px-1"
					autocomplete="subject_name"
				>
			</div>
			<button class="btn btn-lg btn-custom" type="submit">
				Add
			</button>
		</form>
		<SubjectsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SubjectsList from '@app/components/questions/subjects/AdminSubjectsList.vue'
export default defineComponent({
	name: 'AdminQuestionsSubjectsPage',
	components: { SubjectsList },
	layout: 'admin'
})
</script>
<style lang="scss" scoped>
	input {
		border: 1px solid $color-line;
		border-radius: 6px;
		font-size: 16px;
		background-color: $color-tags;
		width: 100%;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
		padding: 1rem 3rem;
	}
</style>
