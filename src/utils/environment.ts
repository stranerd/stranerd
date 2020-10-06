import * as dotenv from 'dotenv'

const environment = dotenv.config().parsed!

export const isDev = () => environment.NODE_ENV === 'development'
export const isProd = () => environment.NODE_ENV === 'production'
