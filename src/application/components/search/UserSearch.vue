<template>
	<Search collection="users" :transform-results="transformResults">
		<template #item="{ item }">
			<NuxtLink :to="`/users/${item.model.id}`" class="d-flex align-items-center gap-1">
				<Avatar :src="item.model.avatar" :size="45" />
				<div class="flex-grow-1">
					<h5 class="mb-0 text-truncate">
						{{ item.model.fullName }}
					</h5>
					<p class="mb-0 text-truncate">
						{{ item.model.email }}
					</p>
				</div>
			</NuxtLink>
		</template>
	</Search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { UserTransformer } from '@modules/users/data/transformers/user'
import { UserFromModel } from '@modules/users/data/models/user'
import Search from '@app/components/search/Search.vue'
export default defineComponent({
	name: 'UserSearch',
	components: { Search },
	setup () {
		return {
			transformResults: (items: any[]) => items
				.map((item) => {
					item.model = (new UserTransformer()).fromJSON({
						id: item.objectID,
						...item.user
					} as UserFromModel)
					return item
				})
		}
	}
})
</script>
