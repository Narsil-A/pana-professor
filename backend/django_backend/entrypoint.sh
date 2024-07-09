#!/bin/sh

# Check if the database is running
if [ "$DATABASE" = "postgres" ]; then
    echo "Checking if database is running..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.1
    done

    echo "The database is up and running :-D"
fi

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Seed the database
python manage.py seed

# Execute the passed command
exec "$@"
