import { firebase } from './environment'
const { CloudTasksClient }= require('@google-cloud/tasks')

type TaskArgs = {
	queue: string
	endpoint: string
	payload: Record<string, any>
	timeInSecs: number
}

export const createTask = async (args: TaskArgs) => {
	const { projectId, location } = firebase()
	const tasksClient = new CloudTasksClient()
	const queuePath = tasksClient.queuePath(projectId, location, args.queue)

	const url = `https://${location}-${projectId}.cloudfunctions.net/${args.endpoint}`

	const [response] = await tasksClient.createTask({
		parent: queuePath,
		task: {
			httpRequest: {
				httpMethod: 'POST',
				url,
				body: Buffer.from(JSON.stringify(args.payload)).toString('base64'),
				headers: { 'Content-Type': 'application/json' }
			},
			scheduleTime: { seconds: args.timeInSecs }
		}
	})

	return response.name
}

export const deleteTask = async (name: string) => {
	await new CloudTasksClient().deleteTask({ name })
}
