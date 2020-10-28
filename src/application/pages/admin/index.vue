<template>
	<div>
		<h2>Courses</h2>
		<ul class="list-group">
			<li class="list-group-item list-group-item-action mb-3">
				<BaseLink to="/admin/subjects" class="d-flex justify-content-between align-items-center">
					<div>
						<h4>Subjects</h4>
						<p>Create, modify and delete subjects</p>
					</div>
					<i class="fas fa-2x fa-angle-right" />
				</BaseLink>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'AdminDashboardPage',
	layout: 'admin'
})
</script>
