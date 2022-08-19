install:
		npm ci
lint:
		npx eslint .
fix:
		npx eslint --fix .
start:
		npx webpack serve