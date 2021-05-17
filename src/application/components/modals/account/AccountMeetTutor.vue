<template>
	<Modal :close="closeAccountModal">
		<template slot="title">
			Meet A Nerd
		</template>
		<div class="d-flex flex-column flex-sm-row gap-0-5 mb-1">
			<SelectSubject :subject-id.sync="subjectId" />
		</div>
		<button class="btn btn-blue" @click="navigate">
			Continue
		</button>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { useAccountModal } from '@app/hooks/core/modals'
import { useTutorsList } from '@app/hooks/users/roles/tutors'
export default defineComponent({
	name: 'AccountMeetTutor',
	components: { SelectSubject },
	setup () {
		const router = useRouter()
		const { closeAccountModal } = useAccountModal()
		const { subjectId } = useTutorsList()
		const navigate = () => {
			router.push('/nerds')
			closeAccountModal()
		}
		return { closeAccountModal, subjectId, navigate }
	}
})
</script>
