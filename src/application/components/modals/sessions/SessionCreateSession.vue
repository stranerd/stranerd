<template>
	<Modal :close="closeSessionModal">
		<template slot="title">
			Request Session
		</template>
		<form @click.prevent="createSession">
			<div class="form-group my-2">
				<textarea
					v-model="factory.message"
					class="form-control"
					rows="3"
					placeholder="Leave a message for the nerd"
					:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message') }"
				/>
				<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
			</div>
			<div class="form-group my-2">
				<select v-model="factory.duration" class="form-select">
					<option disabled value="0">
						Select Session Duration
					</option>
					<option v-for="option in prices" :key="option.duration" :value="option.duration">
						{{ option.duration }} minutes - {{ option.price }} gold coins
					</option>
				</select>
				<template v-if="user.account.coins.gold < factory.duration" class="small">
					<span class="text-danger">You don't have enough gold coins to continue.</span>
					<a class="ml-half" @click.prevent="buy">Buy More Coins</a>
				</template>
			</div>
			<button class="btn btn-blue my-2 w-100" type="submit" :disabled="loading || !factory.valid || user.account.coins.gold < factory.duration">
				Request Session
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAccountModal, useSessionModal } from '@app/hooks/core/modals'
import { useCreateSession } from '@app/hooks/sessions/sessions'
import { useAuth } from '@app/hooks/auth/auth'
export default defineComponent({
	name: 'SessionCreateSession',
	setup () {
		const { user } = useAuth()
		const { closeSessionModal } = useSessionModal()
		const { setAccountModalBuyCoins } = useAccountModal()
		const buy = () => {
			setAccountModalBuyCoins()
			closeSessionModal()
		}
		const { prices, factory, loading, error, createSession } = useCreateSession()
		return {
			closeSessionModal, buy, user,
			prices, factory, loading, error, createSession
		}
	}
})
</script>
