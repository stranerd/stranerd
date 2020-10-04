import { getNewApplication, setupServer } from './utils/setup'

const app = getNewApplication()

app.use('/api', (_, res) => res.send('Api'))
app.use('/in', (_, res) => res.send('In'))

setupServer(app)

export { app }
