"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createTask = void 0;
const environment_1 = require("./environment");
const { CloudTasksClient } = require('@google-cloud/tasks');
const createTask = async (args) => {
    const { projectId, location, taskEmail } = environment_1.firebase();
    const tasksClient = new CloudTasksClient();
    const queuePath = tasksClient.queuePath(projectId, location, args.queue);
    const url = `https://${location}-${projectId}.cloudfunctions.net/${args.endpoint}`;
    const [response] = await tasksClient.createTask({
        parent: queuePath,
        task: {
            httpRequest: {
                httpMethod: 'POST',
                url,
                body: Buffer.from(JSON.stringify(args.payload)).toString('base64'),
                headers: { 'Content-Type': 'application/json' },
                oidcToken: {
                    serviceAccountEmail: `${taskEmail}@${projectId}.iam.gserviceaccount.com`
                }
            },
            scheduleTime: { seconds: args.timeInSecs }
        }
    });
    return response.name;
};
exports.createTask = createTask;
const deleteTask = async (name) => {
    await new CloudTasksClient().deleteTask({ name });
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=cloud-task.js.map