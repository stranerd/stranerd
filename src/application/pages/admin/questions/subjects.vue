<template>
	<div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1 d-flex flex-column">
		<!-- TODO - add a new subject form -->
		<form class="d-flex flex-row mb-2" style="align-items: center;">
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
			<div>
				<button class="btn btn btn-lg btn-custom py-1 px-3" type="submit">
					Add
				</button>
			</div>
		</form>
		<div>
			<SubjectsList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SubjectsList from '@app/components/questions/subjects/AdminSubjectsList.vue'
import { useCreateModal } from '@app/hooks/core/modals'
export default defineComponent({
	name: 'AdminQuestionsSubjectsPage',
	components: { SubjectsList },
	layout: 'admin',
	setup () {
		return { openSubject: useCreateModal().openSubject }
	}
})
</script>
<style lang="scss" scoped>
	input {
		border: 1px solid $color-line;
		border-radius: 6px;
		font-size: 16px;
		background-color: $color-tags;
		width: 100%;
		color: grey;
	}

	.btn-custom {
		background-color: $color-btn;
		color: #fff;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}
</style>
