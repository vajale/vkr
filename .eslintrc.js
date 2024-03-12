module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["standard-with-typescript", "plugin:react/recommended"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		semi: "off",
		"@typescript-eslint/semi": ["error", "always"],
		"@typescript-eslint/quotes": 0,
		"@typescript-eslint/indent": 0,
		"@typescript-eslint/member-delimiter-style": 0,
		"react/prop-types": "off",
		"@typescript-eslint/no-unused-vars": ["warn", { "ignoreRestSiblings": true }],
		"@typescript-eslint/no-explicit-any": ["warn", { "ignoreRestArgs": true }],
		"@typescript-eslint/no-empty-interface": ["warn", { "allowSingleExtends": true }],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-var-requires": 0,
		'@typescript-eslint/explicit-function-return-type': 'off',

	},
}
