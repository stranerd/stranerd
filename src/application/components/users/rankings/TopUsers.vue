<template>
	<div class="p-1">
		<section class="d-flex text-center align-items-center flex-wrap mb-2">
			<h5 class=" font-weight-bold mb-0">
				Top Users
			</h5>
			<form class="form-inline ml-auto">
				<select v-model="period" class="form-control form-control-sm">
					<option v-for="period in periods" :key="period" :value="period">
						{{ period }}
					</option>
				</select>
			</form>
		</section>
		<TopUsersByPeriod :key="period" :period="period" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ssrRef } from '@nuxtjs/composition-api'
import TopUsersByPeriod from '@app/components/users/rankings/TopUsersByPeriod.vue'
import { RankingPeriods } from '@modules/users'
export default defineComponent({
	name: 'TopUsers',
	components: { TopUsersByPeriod },
	setup () {
		const periods = Object.keys(RankingPeriods)
		const period = ssrRef(periods[0])
		return { periods, period }
	}
})
</script>
