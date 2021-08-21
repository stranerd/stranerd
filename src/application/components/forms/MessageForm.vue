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
					:class="{'is-invalid': factory.errors.fName, 'is-valid': factory.isValid('fName')}"
					class="form-control"
					placeholder="John"
				>
				<small v-if="factory.errors.fName" class="small text-danger d-block">
					<DynamicText>{{ factory.errors.fName }}</DynamicText>
				</small>
				<DynamicText>{{ factory.errors.fName }}</DynamicText>
			</div>
			<div class="w-100 flex-grow-1 d-flex flex-column">
				<span>
					<span class="text-danger">*</span>
					<span class="formLabel">Last Name</span>
				</span>
				<input
					id="last_name"
					v-model="factory.lName"
					:class="{'is-invalid': factory.errors.lName, 'is-valid': factory.isValid('lName')}"
					class="form-control"
					placeholder="Smith"
				>
				<small v-if="factory.errors.lName" class="small text-danger d-block">
					<DynamicText>{{ factory.errors.lName }}</DynamicText>
				</small>
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
				:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('email')}"
				class="form-control"
				placeholder="johnsmith@gmail.com"
				type="email"
			>
			<small v-if="factory.errors.email" class="small text-danger d-block">
				<DynamicText>{{ factory.errors.email }}</DynamicText>
			</small>
		</div>

		<div class="d-flex flex-column">
			<span>
				<span class="text-danger">*</span>
				<span class="formLabel">Message</span>
			</span>
			<textarea
				id="message"
				v-model="factory.message"
				:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
				class="form-control"
				placeholder="I love Stranerd"
				rows="4"
			/>
			<small v-if="factory.errors.message" class="small text-danger d-block">
				<DynamicText>{{ factory.errors.message }}</DynamicText>
			</small>
		</div>

		<button :disabled="loading || !factory.valid" class="btn btn btn-lg btn-custom w-100" type="submit">
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
