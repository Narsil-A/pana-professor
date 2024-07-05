FROM python:latest

WORKDIR /usr/src/django_backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y netcat-openbsd

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh /usr/src/django_backend/
RUN chmod +x /usr/src/django_backend/entrypoint.sh

COPY . /usr/src/django_backend/

ENTRYPOINT [ "/bin/sh", "/usr/src/django_backend/entrypoint.sh"]






