#!/bin/bash

#Step 1 : Remove migrations folder
rm -rf prisma/migrations

#Step 2 : Generate prisma client
npx prisma generate

#Step 3 : Run the migration
npx prisma migrate dev --name init

#Step 4 : Run the seed script
npm run seed

#Step 5 : Start the development server
npm run dev