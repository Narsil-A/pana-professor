# Pana Professor App

The Pana Professor App is designed for individuals seeking online classes in a variety of topics such as math, technology, and arts. It is also intended for professors who want to share their knowledge in these subjects.

## Features

Class Creation and Management

	•	Create Classes: Authenticated users can create classes, set a price, and determine the maximum number of students allowed.
	•	Upload Videos: Users can upload class videos in different qualities (480p, 720p, and 1080p) along with subtitles in VTT format (e.g., name_class_english.vtt).
	•	Update Classes: Users can update class details and track the completeness of their class information through a circular progress widget.
   
Video Player

	•	Integrated Video Player: The app features a custom video player that supports multiple video qualities (480p, 720p, 1080p) and subtitles in VTT format. Users can:
	•	Play/Pause: Toggle play and pause states.
	•	Volume Control: Adjust the volume of the video.
	•	Seek: Seek to different parts of the video.
	•	Quality Selection: Select different video qualities.
	•	Subtitle Selection: Choose from available subtitles.
	•	Skip Forward/Backward: Skip 10 seconds forward or backward in the video.
	•	Progress Tracking: View the current time and duration of the video.

Real-time Chat

	•	Contact Professors: Authenticated users can contact the professor of a class via real-time chat for any questions about the class topic. Users navigate to the class detail page, select the professor, and access a contact form widget.


Class Display and Filtering

	•	Homepage Display: All classes are displayed on the homepage, accessible to all users.
	•	Category Filtering: A widget card for each category (e.g., math, language) allows users to filter classes by their main category.


Quizzes and Score Visualization (backend on progress)

	•	Take Quizzes: Authenticated users can take quizzes on various topics they are studying.
	•	View Scores: Users can view their quiz results in a score section with visualizations in different chart types.


Navigation in the App

	•	Navbar: Includes a button to open a modal for adding classes and uploading the respective video files and subtitles.
	•	Menu Navbar: Authenticated users have access to various sections:
	•	Inbox: View conversations and start new ones by contacting professors on the class detail page. Access the detail page by clicking on a class card on the homepage.
	•	Score Section: View score data with options to select different chart types for visualization.
	•	Quiz Section: Take quizzes on studied topics.
	•	Profile Section: View, edit, or delete profile information.
	•	Logout Button: Log out of the application.


## Summary

The Pana Professor App provides a comprehensive platform for both students and professors, facilitating the creation and management of online classes, real-time communication, and interactive learning through quizzes and score visualization.

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
   cd backend 


2. **Create a Virtual Environment (Optional):**

Inside the backend/django_backend folder ser the env. 

   ```sh
   python -m venv env
   source venv/bin/activate



3. **Install Dependencies**

   ```sh
   pip install -r requirements.txt


4. **Configure Environment Variables**

Create a `.env.dev` file in the same level root of the django_backend folder directory and add the following variables:

backend/
   >django_backend
   $ .env.dev
   docker-compose.yml 


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

backend/
   >django_backend
   $ .env.dev
   docker-compose.yml 

`docker-compose up --build`

This will set up the PostgreSQL database and run the Django application.


6. **Run Database Migration and Apply the Database Migrations:**

(optional)

`docker-compose exec web python manage.py makemigrations`
`docker-compose exec web python manage.py migrate`

7. **Run the Development Server**

`docker-compose up`

8. **Create a superuser:**

`docker exec -it backend-web-1 python manage.py createsuperuser`

username:
name:
email:
password:

login with username and password

then go to the http://localhost:8000/admin/login/?next=/admin/ 


# Frontend Setup Instructions

## Prerequisites

`Node.js (latest version)`

`npm (Node Package Manager) or yarn`

1. **Install Dependencies:**

Navigate to the frontend/prueba directory and install dependencies:

`npm install`

2. **Configure Environment Variables:**

Create a `.env.local` file and add the following variable:

frontend/prueba
  >app
  >public
  $ .env.local


`NEXT_PUBLIC_API_HOST=http://localhost:8000`

3. **Run the Development Server:**


`npm run dev`

The application should now be running at http://localhost:3000. 