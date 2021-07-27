<template>
	<div class="wrapper mb-1">
		<div class="d-flex flex-row flex-sm-wrap flex-md-nowrap">
			<div class="d-flex flex-column py-1 px-md-2 px-1 " style="width: 100%;">
				<div class="p-custom">
					This user wasted my time in the session and wasn’t any help.
				</div>
				<div class="p-custom pt-1">
					Reported by <span class="text-primary text-small">Eniola Holmes</span>
				</div>
				<div class="p-custom pt-1">
					Reported user <span class="text-primary text-small">Jadson Wheatson</span>
				</div>
			</div>
			<div class="text-danger text-center ml-auto px-2 py-1 sideBorder d-none d-md-flex flex-column">
				<div style="margin-bottom: 3px;">
					<a style="font-size: 14px;">
						Send warning
					</a>
				</div>
				<div style="margin-bottom: 3px;">
					<a style="font-size: 14px;">
						Suspend User
					</a>
				</div>
				<div style="margin-bottom: 3px;">
					<a style="font-size: 14px;">
						Delete User
					</a>
				</div>
			</div>
			<div class="text-danger px-1 pt-0 pb-1 sideBorder d-md-none d-block col-12 d-flex flex-column">
				<div style="margin-bottom: 2px;">
					<a style="font-size: 14px;">
						Send warning
					</a>
				</div>
				<div style="margin-bottom: 2px;">
					<a style="font-size: 13px;">
						Suspend User
					</a>
				</div>
				<div style="margin-bottom: 2px;">
					<a style="font-size: 13px;">
						Delete User
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
	name: 'UserReportCard'
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
		min-width: 200px;
	}

	.ml-auto {
		margin-left: auto;
	}

</style>
