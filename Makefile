# Create .env file if it doesn't exist
configure:
	@if [ ! -f ".env" ]; then cp .env.example .env; fi;

# Build services
build:
	@docker-compose build

# Start services, migrate databases and seed them with intial data
init-databases:
	@docker-compose up -d
	@echo "Starting services..."
	@docker-compose exec api npx wait-on tcp:mysql:3306 && exit 0
	@echo "Migrating api database..."
	@docker-compose exec api node reset.js
	@echo "Migrating auth database..."
	@docker-compose exec auth knex migrate:latest
	@docker-compose exec auth knex seed:run
	@echo "Migrating image database..."
	@docker-compose exec image knex migrate:latest
	@docker-compose exec image knex seed:run
	@docker-compose down
	@echo "Migrated and seeded databases"