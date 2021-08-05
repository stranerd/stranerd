<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			Request Session
		</template>
		<form @submit.prevent="createSession">
			<!-- <SessionEditor :model.sync="factory.message" :error="factory.errors.message" :valid="factory.isValid('message')" /> -->
			<!-- Add editor and check if text is for editor in chat cards -->
			<div>
				<textarea
					id="email"
					v-model="factory.message"
					required
					placeholder="Leave a message for the nerd"
					class="form-control"
				/>
				<DynamicText v-if="factory.errors.message" class="small text-danger d-block">
					{{ factory.errors.message }}
				</DynamicText>
			</div>
			<div class="form-group my-1">
				<select v-model="factory.duration" class="form-select">
					<option disabled :value="0">
						Select Session Duration
					</option>
					<option v-for="option in prices" :key="option.duration" :value="option.duration">
						{{ option.duration }} minutes - {{ option.price }} gold coins
					</option>
				</select>
				<template v-if="user.account.coins.gold < factory.price" class="small">
					<span class="text-danger">You don't have enough gold coins to continue.</span>
					<a class="ml-half" @click.prevent="buy">Buy More Coins</a>
				</template>
			</div>
			<button class="btn btn-dark my-1 w-100" type="submit" :disabled="loading || !factory.valid || user.account.coins.gold < factory.price">
				Request Session
			</button>
			<DisplayError :error="error" />
			<PageLoading v-if="loading" />
		</form>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAccountModal } from '@app/hooks/core/modals'
import { useCreateSession } from '@app/hooks/sessions/sessions'
import { useAuth } from '@app/hooks/auth/auth'
import { analytics } from '@modules/core'
// import SessionEditor from '@app/components/core/editor/SessionEditor.vue'
export default defineComponent({
	name: 'SessionCreateSession',
	// components: { SessionEditor },
	setup () {
		const { user } = useAuth()
		const buy = useAccountModal().openBuyCoins
		const { prices, factory, loading, error, createSession } = useCreateSession()
		onMounted(() => {
			analytics.logEvent('view_session_request')
		})
		return {
			buy, user,
			prices, factory, loading, error, createSession
		}
	}
})
</script>
