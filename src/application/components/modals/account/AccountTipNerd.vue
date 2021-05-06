<template>
	<Modal :close="closeAccountModal">
		<template slot="title">
			Tip {{ nerdBioAndId.bio.name.first }}
		</template>
		<div class="d-flex justify-content-end px-3 mb-2">
			<div class="d-flex align-items-center position-relative ml-1">
				<Coins :size="24" style="z-index:1;" />
				<span class="rounded-pill ml-n2 px-2 pl-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.bronze) }}
				</span>
			</div>
			<div class="d-flex align-items-center position-relative ml-1">
				<Coins :gold="true" :size="24" style="z-index:1;" />
				<span class="rounded-pill ml-n2 px-2 pl-3 bg-blue-grey text-light-blue">
					{{ formatNumber(user.account.coins.gold) }}
				</span>
			</div>
		</div>
		<button class="btn btn-sm btn-outline-blue rounded-lg font-weight-bold px-2 py-half">
			<span>1</span>
			<Coins :gold="true" :size="20" />
		</button>
		<button class="btn btn-sm btn-outline-blue rounded-lg font-weight-bold px-2 py-half">
			<span>2</span>
			<Coins :gold="true" :size="20" />
		</button>
		<button class="btn btn-sm btn-outline-blue rounded-lg font-weight-bold px-2 py-half">
			<span>3</span>
			<Coins :gold="true" :size="20" />
		</button>
		<button class="btn btn-sm btn-outline-blue rounded-lg font-weight-bold px-2 py-half">
			<span>4</span>
			<Coins :gold="true" :size="20" />
		</button>
		<button class="btn btn-sm btn-outline-blue rounded-lg font-weight-bold px-2 py-half">
			<span>5</span>
			<Coins :gold="true" :size="20" />
		</button>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useTipNerd } from '@app/hooks/users/account'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber } from '@utils/numbers'
export default defineComponent({
	name: 'AccountTipNerd',
	setup () {
		const { user } = useAuth()
		const { loading, error, tip, nerdBioAndId, tipNerd } = useTipNerd()
		const { closeAccountModal } = useAccountModal()
		return {
			user, formatNumber,
			loading, error, tip, nerdBioAndId,
			tipNerd, closeAccountModal
		}
	}
})
</script>
