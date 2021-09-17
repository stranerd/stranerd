/* eslint-disable arrow-parens */
const fs = require('fs')
const path = require('path')

const iconsDir = path.resolve(__dirname, 'src/application/assets/icons/source')
const destFile = path.resolve(__dirname, 'src/application/assets/icons/iconNames.ts')

const names = fs
	.readdirSync(iconsDir)
	.filter(filename => /\.svg$/.test(filename))
	.map(filename => filename.replace('.svg', ''))
	.map(iconname => `'${iconname}' = '${iconname}'`)
	.join(',\n  ')

const content = `// THIS FILE IS AUTO GENERATED
/* eslint-disable prettier/prettier */

export enum IconNames {
  ${names}
}
`

fs.writeFileSync(destFile, content, { encoding: 'utf-8' })
