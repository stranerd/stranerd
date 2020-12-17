<template>
	<form @submit.prevent="submit">
		<div class="form-group my-2">
			<label class="label">Description</label>
			<input
				v-model="factory.description"
				class="form-control"
				placeholder="Write a one sentence description"
				:class="{'is-invalid': factory.errors.description, 'is-valid': factory.isValid('description')}"
			>
			<small v-if="factory.errors.description" class="small text-danger d-block">{{ factory.errors.description }}</small>
		</div>
		<div class="form-group my-2">
			<label class="label">Reward</label>
			<input
				v-model.number="factory.reward"
				type="number"
				min="0"
				class="form-control"
				placeholder="Reward for completion"
				:class="{'is-invalid': factory.errors.reward, 'is-valid': factory.isValid('reward')}"
			>
			<small v-if="factory.errors.reward" class="small text-danger d-block">{{ factory.errors.reward }}</small>
		</div>
		<div class="form-group my-2">
			<label class="label">Time</label>
			<input
				v-model.number="factory.time"
				type="number"
				min="0"
				class="form-control"
				placeholder="Time for completion in minutes"
				:class="{'is-invalid': factory.errors.time, 'is-valid': factory.isValid('time')}"
			>
			<small v-if="factory.errors.time" class="small text-danger d-block">{{ factory.errors.time }}</small>
		</div>
		<div class="form-group my-2">
			<select v-model="factory.subjectId" class="form-control form-control rounded-pill">
				<option value="">
					All subjects
				</option>
				<option v-for="subject in subjects" :key="subject.id" :value="subject.id">
					{{ subject.name }}
				</option>
			</select>
			<small v-if="factory.errors.subjectId" class="small text-danger d-block">{{ factory.errors.subjectId }}</small>
		</div>
		<div class="form-group my-2">
			<label class="label">Count</label>
			<input
				v-model.number="factory.count"
				type="number"
				min="0"
				class="form-control"
				placeholder="No of questions to answer"
				:class="{'is-invalid': factory.errors.count, 'is-valid': factory.isValid('count')}"
			>
			<small v-if="factory.errors.count" class="small text-danger d-block">{{ factory.errors.count }}</small>
		</div>
		<hr>
		<div class="d-flex justify-content-end my-2">
			<button class="btn btn-accent text-white" type="submit" :disabled="loading || !factory.valid">
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
		<PageLoading v-if="loading" />
		<PageLoading v-if="subLoading" />
		<DisplayError :error="error" />
		<DisplayError :error="subError" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AnswerChallengeFactory } from '@modules/challenges'
import { useSubjectList } from '@app/hooks/questions/subjects'
export default defineComponent({
	name: 'AnswerChallengeForm',
	props: {
		factory: {
			type: AnswerChallengeFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup () {
		const { subjects, loading: subLoading, error: subError } = useSubjectList()
		return { subjects, subLoading, subError }
	}
})
</script>
