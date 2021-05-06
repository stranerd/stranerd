<template>
	<section>
		<div class="d-flex text-center align-items-center flex-wrap">
			<h5 class="font-weight-bold mb-0">
				Top Users
			</h5>
			<form class="form-inline ms-auto">
				<select v-model="period" class="form-select form-select-sm">
					<option v-for="period in periods" :key="period" :value="period">
						{{ period }}
					</option>
				</select>
			</form>
		</div>
		<div class="thick" />
		<TopUsersByPeriod :key="period" :period="period" />
	</section>
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
