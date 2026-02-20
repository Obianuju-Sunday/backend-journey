# TODO API

This is a **Todo API.** You can use it to seamlessly save all you need to do for the day and access it conveniently without much effort.

## Tech Stack
- Node.js v20
- Express.js
- PostgreSQL

## Features
- Create a todo with validation
- Get all todos or a specific todo by ID
- Update existing todos
- Delete todos
- Input validation and error handling
- Secure environment variable configuration

## Prerequisites
- Node.js v20 or higher
- PostgreSQL installed and running
- npm (comes with Node.js)

## Installation Steps
1. Clone the repository
```bash
   git clone https://github.com/Obianuju-Sunday/backend-journey.git
   cd backend-journey/todo-api
```

2. Install dependencies
```bash
   npm install
```

3. Set up the database
```bash
   sudo -u postgres psql
   CREATE DATABASE todo_app;
   \c todo_app
   CREATE TABLE todos (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       completed BOOLEAN DEFAULT false
   );
   \q
```

4. Configure environment variables
   Create a `.env` file in the root directory:
```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=todo_app
   DB_PASSWORD=your_password
   DB_PORT=5432
```

5. Start the server
```bash
   node server.js
```
   Server runs on `http://localhost:3000`

## API Endpoints

### GET /todos
Get all todos
```json
Response: [
  {
    "id": 1,
    "title": "Learn Node.js",
    "completed": false
  }
]
```

### GET /todos/:id
Get a specific todo by ID
```json
Response: {
  "id": 1,
  "title": "Learn Node.js",
  "completed": false
}
```

### POST /todos
Create a new todo
```json
Request Body: {
  "title": "New task",
  "completed": false
}

Response: {
  "id": 2,
  "title": "New task",
  "completed": false
}
```

### PUT /todos/:id
Update an existing todo
```json
Request Body: {
  "title": "Updated task",
  "completed": true
}

Response: {
  "id": 1,
  "title": "Updated task",
  "completed": true
}
```

### DELETE /todos/:id
Delete a todo
```json
Response: {
  "message": "Todo deleted successfully"
}
```

## Database Schema
```sql
Table: todos
- id: SERIAL PRIMARY KEY
- title: VARCHAR(255) NOT NULL
- completed: BOOLEAN DEFAULT false
```

## Error Handling
- 400: Bad Request (validation errors)
- 404: Not Found (todo doesn't exist)
- 500: Internal Server Error

---

Built as part of my backend engineering journey 🚀