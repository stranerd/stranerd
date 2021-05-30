<template>
	<div class="d-flex gap-0-5 flex-wrap align-items-start">
		<div class="d-flex flex-column flex-grow-1 gap-0-25">
			<span>{{ application.userBio.name.fullName }}</span>
			<span>{{ application.course }}</span>
			<span>{{ subject ? subject.name : 'Subject' }}</span>
			<a target="_blank" style="text-decoration: underline" :href="application.proof.link">{{ application.proof.name }}</a>
			<p class="mb-0">
				About User: {{ application.about }}
			</p>
			<p class="mb-0">
				Why user wants to be a nerd: {{ application.description }}
			</p>
		</div>
		<div class="d-flex ms-auto gap-0-5">
			<a @click="acceptApplication">
				<i class="fas fa-check text-success" style="font-size:1.5em" />
			</a>
			<a @click="rejectApplication">
				<i class="fas fa-times text-danger" style="font-size:1.5em" />
			</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError class="w-100" :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { TutorApplicationEntity } from '@modules/users'
import { useSubject } from '@app/hooks/questions/subjects'
import { useTutorApplication } from '@app/hooks/users/tutorApplication'
export default defineComponent({
	name: 'TutorApplicationListCard',
	props: {
		application: {
			type: Object as PropType<TutorApplicationEntity>,
			required: true
		}
	},
	setup (props) {
		const { subject } = useSubject(props.application.subjectId)
		const { loading, error, acceptApplication, rejectApplication } = useTutorApplication(props.application.id)
		return {
			subject,
			loading, error, acceptApplication, rejectApplication
		}
	}
})
</script>
