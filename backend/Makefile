docker-up:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d

# project-build:
# 	npm run build

drop-DB:
	docker compose exec mysql sh -c 'mysql -uroot -p"$$MYSQL_ROOT_PASSWORD" -e "DROP DATABASE IF EXISTS $$MYSQL_DATABASE;"'

create-DB:
	docker compose exec mysql sh -c 'mysql -uroot -p"$$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $$MYSQL_DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'

# migration-create:
# 	npx typeorm-ts-node-commonjs migration:create migration/Init

migration-generate:
	node -r ts-node/register -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate migration/Init -d ./fixture/data-source.ts

migration-run:
	node -r ts-node/register -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./fixture/data-source.ts

fixture-setup:
	npx ts-node -r tsconfig-paths/register ./fixture/seed.ts

dev-DB-create: drop-DB create-DB migration-generate fixture-setup
