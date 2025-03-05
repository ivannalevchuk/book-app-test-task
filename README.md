Book Management App

This is a simple Book Management Application built with React and React Router.

Features:

1. Add, edit, delete books
2. View a list of all books
3. Form validation with error handling
4. Persistent data using local storage or API integration
5. Responsive UI

Make sure you have the following installed on your machine:

Node.js (version 16+ recommended)
npm or yarn

Getting Started

1. Clone the Repository

git clone https://github.com/ivannalevchuk/book-app-test-task
cd book-app-test-task

2. Install Dependencies

Using npm:
npm install

Or using yarn:
yarn install

3. Start the JSON Server
This application relies on a mock backend using json-server. To start the server, run:
npx json-server --watch db.json --port 3000

Or, if you have json-server installed globally:
json-server --watch db.json --port 3000

Make sure the server is running before starting the application.

3. Run the Application Locally

Using npm:
npm run dev

Or using yarn:
yarn dev
