# Teacher Toolbox

## Overview:
Here, in this web application, teachers can work together in teams to share and document strategies for teaching and learning. The can add their feedback and reflections about different strategies, and see the feedback from other teachers.
This app is follow up to my first JavaScript web application- "A Teacher Reflection Tool."

## Features:
- **Create a Profile:** Users can "sign up" and create their own profile. Once signed up, they can log in and utlize the features. Additionally, users can update and delete their profile should they choose.

- **Login:** Users use a unique username and password to log in and use the features of the teacher page.

- **Strategies:** All viewers of the page can view the "Strategies" page, in which they can browse strategies for teaching and learning. They can click on a button to view the reflections and feedback about each strategy added by other users/teachers.

- **Teacher Page:** Logged in users can access their own "Teacher Page," their own sort of Teacher Toolbox. Here, they can see the reflections that they have written about each strategy. They can update and/or delete any of those reflections. They can also open up a modal to add a new strategy reflection, that will post to their page, and to the Strategies page, adding to the backend database. 
They will also find their profile information here on this page, where they can update and/or delete their profile. 

## Data Source:
The data for this application is added by users, and through this, makes it a tool for collaboration amongst teams of teachers. All data added is stored in the app's database. A seed file is utilized to show the functionality of the app.

## Technologies Used:
The frontend of this application is powered by JavaScript and React. The backend is powered by Python and Flask. SQLAlchemy is utilized for database access. React Final-Form and Yup are used for form management and validation. CSS, Bootstrap and MUI are used to style the application.

## How to Run the Application:
Prerequisites to access this application:
-have Python, Pip, Node installed. 

Then:
1. Clone this repository to your local machine.
2. To run the React app on localhost:3000, run **npm start --prefix client**.
3. Run **python server/app.py** to run the backend of the application.
