module.exports = {
	"root": true,
	"env": {
		"node": true
	},
	"extends": [
		"eslint:recommended",
		'plugin:vue/recommended',
		"@nuxtjs/eslint-config-typescript"
	],
	"parserOptions": {
		"parser": "@typescript-eslint/parser"
	},
	"rules": {
		"no-console": "off",
		"no-debugger": "warn",
		"no-tabs": "off",
		"no-var": "error",
		"no-unused-vars": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"indent": ["error", "tab", { "SwitchCase": 1 }],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"semi": ["error", "never"],
		"quotes": ["error", "single"],
		"prefer-const": ["error"],
		"arrow-parens": ["error", "always"],
		"no-return-assign": "off",
		"curly": "off",
		"vue/html-indent": ["warn", "tab", {
			"attribute": 1,
			"baseIndent": 1,
			"closeBracket": 0,
			"alignAttributesVertically": true,
			"ignores": []
		}],
		"vue/no-mutating-props": "off",
		"object-property-newline": "off",
		"require-atomic-updates": "off",
		"require-await": "off"
	},
	"overrides": [
		{
			"files": ["tests/**/*.[jt]s?(x)", "tests/**/*.spec.[jt]s?(x)"],
			"env": {
				"jest": true
			}
		}
	]
}
