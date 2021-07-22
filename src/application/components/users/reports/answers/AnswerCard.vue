<template>
	<div class="wrapper mb-1">
		<div class="d-flex flex-row flex-sm-wrap flex-md-nowrap">
			<div class="d-flex flex-column py-1 px-md-2 px-1 " style="width:100%;">
				<div class="p-custom">
					How can you be so stupid! That’s too easy, lol
				</div>
				<div class="p-custom pt-1">
					Reported by <span class="text-primary text-small">Eniola Holmes</span>
				</div>
				<div class="p-custom pt-1" style="font-size:14px;">
					This answer contains abuse.
				</div>
			</div>
			<div class="text-danger text-center ml-auto px-2 py-1 sideBorder d-none d-md-flex ">
				<a style="font-size: 14px;">
					Delete Answer
				</a>
			</div>
			<div class="text-danger px-1 pt-0 pb-1 d-md-none d-block col-12 ">
				<a style="font-size: 13px;">
					Delete Answer
				</a>
			</div>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useAdminRoles } from '@app/hooks/users/roles/admins'
import { UserEntity } from '@modules/users'
export default defineComponent({
	name: 'AnswerCard',
	props: {
		admin: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		const { loading, error, deAdminUser } = useAdminRoles()
		return {
			loading, error, deAdminUser
		}
	}
})
</script>
<style lang="scss" scoped>
	.p-custom {
		font-size: 15px;
		color: $color-dark;
	}

	.wrapper {
		border: 1px solid $color-line;
		border-radius: 5px;
		background-color: $color-tags;
	}

	.sideBorder {
		border-left: 1px solid $color-line;
		min-width:200px;
	}

	.ml-auto {
		margin-left:auto;
	}

</style>
