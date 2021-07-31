<template>
	<form class="d-flex flex-column p-2 gap-1" @submit.prevent="createMessage">
		<div class="d-flex flex-column flex-md-row gap-1">
			<div class="w-100 flex-grow-1 d-flex flex-column">
				<span>
					<span class="text-danger">*</span>
					<span class="formLabel">First Name</span>
				</span>
				<input
					id="first_name"
					v-model="factory.fName"
					class="form-control"
					placeholder="John"
					:class="{'is-invalid': factory.errors.fName, 'is-valid': factory.isValid('fName')}"
				>
				<small v-if="factory.errors.fName" class="small text-danger d-block">{{ factory.errors.fName }}</small>
			</div>
			<div class="w-100 flex-grow-1 d-flex flex-column">
				<span>
					<span class="text-danger">*</span>
					<span class="formLabel">Last Name</span>
				</span>
				<input
					id="last_name"
					v-model="factory.lName"
					class="form-control"
					placeholder="Smith"
					:class="{'is-invalid': factory.errors.lName, 'is-valid': factory.isValid('lName')}"
				>
				<small v-if="factory.errors.lName" class="small text-danger d-block">{{ factory.errors.lName }}</small>
			</div>
		</div>

		<div class="d-flex flex-column">
			<span>
				<span class="text-danger">*</span>
				<span class="formLabel">Email</span>
			</span>
			<input
				id="email"
				v-model="factory.email"
				class="form-control"
				type="email"
				placeholder="johnsmith@gmail.com"
				:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('email')}"
			>
			<small v-if="factory.errors.email" class="small text-danger d-block">{{ factory.errors.email }}</small>
		</div>

		<div class="d-flex flex-column">
			<span>
				<span class="text-danger">*</span>
				<span class="formLabel">Message</span>
			</span>
			<textarea
				id="message"
				v-model="factory.message"
				class="form-control"
				rows="4"
				:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
				placeholder="I love Stranerd"
			/>
			<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
		</div>

		<button class="btn btn btn-lg btn-custom w-100" type="submit" :disabled="loading || !factory.valid">
			Send Message
		</button>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateMessage } from '@app/hooks/forms/messages'
export default defineComponent({
	name: 'MessageForm',
	setup () {
		const { factory, loading, error, createMessage } = useCreateMessage()
		return { factory, loading, error, createMessage }
	}
})
</script>

<style lang="scss" scoped>
	input, textarea {
		border: 1px solid $color-sub;
		border-radius: 3px;
		font-size: 14px;
		color: $color-sub;
	}

	.formLabel {
		font-size: 15px;
		font-weight: bold;
	}

	.btn-custom {
		background-color: $color-primary;
		color: $color-white;
		border: 2px solid $color-primary;
		border-radius: 6px;
		font-size: 15px;
		font-weight: bold;
	}
</style>
