# Recipe Finder

A full-stack web application where users can sign in and view detailed recipes. Built with React on the frontend and Node.js, Express, and MongoDB on the backend.

Features:
- User sign-in interface
- View detailed recipe pages
- Connects frontend to backend via RESTful API
- Clean, responsive UI built with custom CSS
- Stores and retrieves recipe data from MongoDB

Tech Stack:
Frontend
- React
- React Router (if used)
- Custom CSS styling

Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Body-parser (included in Express >=4.16 as express.json())

Modules Used:
Frontend (React)
- react
- react-dom
- react-scripts

Backend (Node.js)
- express
- mongoose
- cors
- dotenv (optional, if environment variables are used)

Prerequisites:
- Node.js and npm
- MongoDB running locally or via a cloud service (e.g., Atlas)
- Git (to clone the repo)

How It Works:
1. The user visits the frontend and signs in via the sign-in form.
2. Recipes are fetched from the backend using an HTTP GET request.
3. The backend serves recipe data stored in MongoDB using Express routes (recipeRoutes.js).
4. Recipes are rendered dynamically using React components like RecipePage.js.

Setup Instructions:
1. Clone the repository
2. Set up the backend:
cd backend
npm install
If using a .env file for your MongoDB URI, create it and add:
MONGODB_URI=mongodb://localhost:27017/your-db-name
Start the server:
node server.js
3. Set up the frontend:
cd ../frontend
npm install
npm start

License:
This project is licensed under the MIT License.


