const fs = require('fs')
const path = require('path')

const iconsDir = path.resolve(process.cwd(), 'src/application/assets/icons/source')
const destFile = path.resolve(process.cwd(), 'src/application/assets/icons/iconNames.ts')

const names = fs
	.readdirSync(iconsDir)
	.filter((filename) => /\.svg$/.test(filename))
	.map((filename) => filename.replace('.svg', ''))
	.map((iconName) => `'${iconName}' = '${iconName}'`)
	.join(',\n  ')

const content = `// THIS FILE IS AUTO GENERATED

export enum IconNames {
  ${names}
}
`

fs.writeFileSync(destFile, content, { encoding: 'utf-8' })
