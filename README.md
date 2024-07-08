Pana Professor App

This is an application for people that are looking for online classes in diverse topics, like math, tecnology and arts...and also, professor that want shared they knowlage is this topics. 

The main funcionality is that a authenticated user can create a class, set a price if they want, and number of students permited in the class room. The user can upload the class videos in different qualities and with their subtitles. 

The authenticated user can contact the professor of the class with a real time chat and asked any question about the topic of the class. 

Each class will be show up in the home page for all user to see it, and also, a widget card with each category will filter the classes from their main category. 

Also, the app have a section where the user can do quizzes about the topics, and see the results in a score section with visualization charts in differents types of charts. 

So navigate in the app:
   - In the navbar are a  buttion that open a modal to add the classes and the respective files videos and subtitles. 
   - in the menu navbar authenticated user will see varios sections:
            - inbox: here the authenticated user can see  the conversation when they have one. To start the conversation they must contact the professor in the detail page of each class. To acces the detail page, must go into the card of each class on the home page. 
            - In the score section will see the charts with buttons where the user can set the type of charts they want vizualize the data score
            - Quiz section, the authenticated user can do quizzes of the topics they are studying. 
            - In the profile section the authenticated user can see their information and edit or delete their user. 
            - and finally the logout button. 




Django Backend Setup Instructions:

Prerequisites

Ensure you have the following installed on your system:

1. Python (latest version)
2. Docker or OrbStack
3. PostgreSQL


Project Structure

1. requirements.txt
2. Dockerfile to containerize the Django application.
3. entrypoint.sh Script to set up the database and start the application.
4. .env Environment variables for the application.

Setup Instructions

1. Clone the repository to your local machine:

1.1 Create project <name> folder, and inside clone the repository. 

git clone <https://github.com/Narsil-A/pana-professor.git>
cd django_backend

2. Create a Virtual Environment (Optional). 

python -m venv venv
source venv/bin/activate

3. Install Dependencies

pip install -r requirements.txt 

4. Configure Environment Variables

Create a .env.dev file in the root of the django_backend folder directory and add the following variables:

DEBUG=1
SECRET_KEY=your_secret_key
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=django_backend
SQL_USER=postgresuser
SQL_PASSWORD=postgrespassword
SQL_HOST=db
SQL_PORT=5432
DATABASE=postgres

5. Set Up Docker

Build and run the Docker containers:

docker-compose up --build

This will set up the PostgreSQL database and run the Django application.

6. Run Database Migration and apply the database migrations:

docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate

7. Create a Superuser 
docker-compose exec web python manage.py createsuperuser

8. Run the Development Server

docker-compose up


9. Create a superuser:

docker exec -it backend-web-1 python manage.py createsuperuser

then go to the http://localhost:8000/admin/login/?next=/admin/ 

Frontend Setup Instructions

Prerequisites

Node.js (latest version)

npm (Node Package Manager) or yarn

1. Go to the cd frontend/prueba folder and npm install 