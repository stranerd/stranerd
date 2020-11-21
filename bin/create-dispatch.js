const fs = require('fs')

const app = (process.argv[2] ?? '').toLowerCase()
const content = `dispatch:
	- url: "${app}.uc.r.appspot.com/*"
		service: default
 
	- url: "*.${app}.uc.r.appspot.com/*"
		service: default`

fs.writeFileSync('dispatch.yaml', content)
