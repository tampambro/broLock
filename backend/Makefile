docker-up:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d

project-build:
	npm run build

drop-DB:
	docker compose exec mysql sh -c 'mysql -uroot -p"$$MYSQL_ROOT_PASSWORD" -e "DROP DATABASE IF EXISTS $$MYSQL_DATABASE;"'

create-DB:
	docker compose exec mysql sh -c 'mysql -uroot -p"$$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $$MYSQL_DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'

# migration-create:
# 	npx typeorm-ts-node-commonjs migration:create migration/Init

migration-generate:
	npx typeorm-ts-node-commonjs migration:generate migration/Init -d ./data-source.ts

# migration-run:
# 	npx typeorm-ts-node-commonjs migration:run -d ./data-source.ts

fixture-setup:
	npx ts-node -r tsconfig-paths/register fixture/seed.ts

dev-DB-create:
	make project-build drop-DB create-DB migration-generate fixture-setup
