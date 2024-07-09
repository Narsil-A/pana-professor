FROM python:latest

# Set working directory
WORKDIR /usr/src/django_backend

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN apt-get update && apt-get install -y netcat-openbsd

# Upgrade pip
RUN pip install --upgrade pip

# Copy requirements file
COPY ./requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy entrypoint script and grant execution permissions
COPY ./entrypoint.sh /usr/src/django_backend/
RUN chmod +x /usr/src/django_backend/entrypoint.sh

# Copy project files
COPY . /usr/src/django_backend/

# Set entrypoint
ENTRYPOINT [ "/bin/sh", "/usr/src/django_backend/entrypoint.sh"]
