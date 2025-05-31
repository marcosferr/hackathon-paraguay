#!/bin/bash

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# Run the schema file
echo "Updating database schema..."
psql "$DATABASE_URL" -f lib/schema.sql

echo "Database schema update completed!" 