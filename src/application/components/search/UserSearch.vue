<template>
	<Search collection="users" :transform-results="transformResults">
		<template #item="{ item }">
			<div class="text-blue">
				<NuxtLink :to="`/users/${item.user.id}`" class="d-flex align-items-center gap-1">
					<Avatar :src="item.user.avatar" :size="45" />
					<div class="flex-grow-1">
						<h5 class="mb-0 text-truncate">
							{{ item.user.fullName }}
						</h5>
						<p class="mb-0 text-truncate">
							{{ item.user.email }}
						</p>
					</div>
				</NuxtLink>
			</div>
		</template>
	</Search>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { UserTransformer } from '@modules/users/data/transformers/user'
import { UserFromModel } from '@modules/users/data/models/user'
import Search from '@app/components/search/Search.vue'
export default defineComponent({
	components: { Search },
	setup () {
		return {
			transformResults: (items: any[]) => items
				.map((item) => {
					item.user = (new UserTransformer()).fromJSON({
						id: item.objectID,
						bio: item.bio
					} as UserFromModel)
					return item
				})
		}
	}
})
</script>
