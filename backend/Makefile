docker-up:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d

create-db:
	docker compose exec mysql sh -c 'mysql -uroot -p"$$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $$MYSQL_DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'

migration-generate:
	npx typeorm-ts-node-commonjs migration:generate migration/Init -d ./data-source.ts

migration-run:
	npx typeorm-ts-node-commonjs migration:run -d ./data-source.ts

fixture-setup:
	npx ts-node -r tsconfig-paths/register fixture/seed.ts
