npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/db/data-source-cli.ts
npm run typeorm migration:show
npm run typeorm migration:generate src/db/migrations/create-tables
npm run typeorm migration:generate src/db/migrations/map-user-order
npm run typeorm migration:generate src/db/migrations/rel-order-itemOrder
npm run typeorm migration:generate src/db/migrations/rel-order-itemOrder-product
npm run typeorm migration:run
