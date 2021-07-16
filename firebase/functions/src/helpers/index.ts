export const PATH_SEPARATOR = '---'

export const getChatsPath = (path: [string, string]) => [...path].sort().join(PATH_SEPARATOR)

export const getRandomValue = () => Date.now() + Math.random().toString(36).substr(2)
