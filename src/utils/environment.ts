import * as dotenv from 'dotenv'

const environment = process.env.NODE_ENV === 'production' ? process.env : dotenv.config().parsed!

export const isDev = () => environment.NODE_ENV === 'development'
export const isProd = () => environment.NODE_ENV === 'production'

export const host = () => environment.HOST
export const port = () => parseInt(environment.PORT!)
