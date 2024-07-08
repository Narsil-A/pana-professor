# Pana Professor App

This application is designed for people seeking online classes in diverse topics such as math, technology, and arts. It is also aimed at professors who want to share their knowledge in these subjects.

The main functionality allows authenticated users to create classes, set a price if desired, and determine the number of students permitted in the classroom. Users can upload class videos in different qualities and with their subtitles.

Authenticated users can contact the professor of a class via real-time chat to ask any questions about the class topic.

Each class is displayed on the homepage for all users to see, and a widget card for each category filters the classes by their main category.

Additionally, the app includes a section where users can take quizzes on various topics and view the results in a score section with visualizations in different chart types.

## Navigation in the App

- The navbar includes a button that opens a modal to add classes and upload the respective video files and subtitles.
- In the menu navbar, authenticated users will see various sections:
  - **Inbox**: Here, authenticated users can see their conversations. To start a conversation, they must contact the professor on the detail page of each class. To access the detail page, they must click on the class card on the homepage.
  - **Score Section**: Users can view charts with buttons to select the type of chart they want to visualize their score data.
  - **Quiz Section**: Authenticated users can take quizzes on the topics they are studying.
  - **Profile Section**: Authenticated users can view, edit, or delete their profile information.
  - **Logout Button**: Allows users to log out of the application.

# Backend Setup Instructions

## Prerequisites

Ensure you have the following installed on your system:

1. Python (latest version)
2. Docker or OrbStack
3. PostgreSQL

## Project Structure

1. `requirements.txt`
2. `Dockerfile` to containerize the Django application.
3. `entrypoint.sh`: Script to set up the database and start the application.
4. `.env`: Environment variables for the application.

## Setup Instructions

1. **Clone the repository to your local machine:**

   Create a project folder, and inside, clone the repository:

   ```sh
   git clone https://github.com/Narsil-A/pana-professor.git
   cd django_backend




2. **Create a Virtual Environment (Optional):**

   ```sh
   python -m venv venv
   source venv/bin/activate



3. **Install Dependencies**

   ```sh
   pip install -r requirements.txt


4. **Configure Environment Variables**

Create a `.env.dev` file in the same level of the django_backend folder directory and add the following variables:


```
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

```



5. **Set Up Docker:**

Build and run the Docker containers:

`docker-compose up --build`

This will set up the PostgreSQL database and run the Django application.

6. **Run Database Migration and Apply the Database Migrations:**

`docker-compose exec web python manage.py makemigrations`
`docker-compose exec web python manage.py migrate`

7. **Create a Superuser:**

`docker-compose exec web python manage.py createsuperuser`

8. **Run the Development Server**

`docker-compose up`

9. **Create a superuser:**

`docker exec -it backend-web-1 python manage.py createsuperuser`

then go to the http://localhost:8000/admin/login/?next=/admin/ 



# Frontend Setup Instructions

## Prerequisites

`Node.js (latest version)`

`npm (Node Package Manager) or yarn`

1. **Install Dependencies:**

Navigate to the frontend directory and install dependencies:

`npm install`

2. **Configure Environment Variables:**

Create a `.env.local` file and add the following variable:

NEXT_PUBLIC_API_HOST=http://localhost:8000

3. **Run the Development Server:**

The application should now be running at http://localhost:3000. 