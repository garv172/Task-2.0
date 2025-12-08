# Task-2.0 — Frontend Interface for Task Management (CRUD UI)
📌 Overview

Task-2.0 focuses on building a fully functional frontend interface that allows users to add, edit, delete, and view tasks using the existing backend CRUD APIs created in Task-1.
The goal is to create an intuitive, user-friendly UI that interacts seamlessly with the backend services.

This task demonstrates frontend-backend integration, API consumption, state handling, and UI/UX design.

🚀 Features

Fully interactive UI for managing tasks

Create, update, delete tasks

Fetch and display task list from backend

Form validation and error handling

Real-time UI updates after operations

Clean, responsive interface

Proper integration with backend CRUD APIs

🧰 Tech Stack

(Modify according to your implementation)

Framework: React.js / Vue.js / Angular

Styling: Tailwind CSS / Bootstrap / CSS Modules

API Handling: Axios / Fetch API

Backend: Uses CRUD APIs from Task-1

Tools: npm, Git, Browser DevTools

🖥️ UI Functionality Overview
1. Add Task

Input fields for task details

Submit button triggers POST API

Form validation for empty fields

Success message + auto-refresh list

2. Edit Task

Editable form modal

PUT API call to update the selected task

Updated list displayed instantly

3. Delete Task

Delete icon/button for each task

Confirmation prompt

DELETE API call and UI refresh

4. View Tasks

Task list fetched from backend (GET API)

Displays dynamic data

Handles loading & error states

🔧 API Endpoints Used
Method	Endpoint	Purpose
POST	/tasks	Create a new task
GET	/tasks	Fetch all tasks
PUT	/tasks/:id	Update an existing task
DELETE	/tasks/:id	Delete a task

(Replace with exact endpoints from your backend.)

🛠️ Getting Started
1. Clone the repository
git clone https://github.com/garv172/Task-2.0.git
cd Task-2.0

2. Install dependencies
npm install

3. Configure API base URL

Create a .env file (if used):

VITE_API_URL=http://localhost:3000

4. Start the frontend
npm run dev

5. Build for production
npm run build

📘 Creating Your PR
Title

Write a clear, specific title summarizing the UI change.

Good: “Add task editing modal + API integration”

Bad: “UI update”

Description

Complete the full PR description template.

Why this change is needed

Explain what new UI feature was built or improved.
Helps maintain clarity for future developers.

API Integration / UI Changes

# Document:

New screens / components

Updated workflows

API calls (GET/POST/PUT/DELETE)

If none, mention “No API changes — only UI updates.”

Screenshots

Include:

Before / after UI

Form validation states

Task list updates

Error messages (if added)

Screenshots greatly speed up code review.

Testing

# Explain how you tested:

Adding tasks

Editing tasks

Deleting tasks

Page reload consistency

Handling API failures

Meta Information
Assignee

Assign the PR to yourself.

# Labels

Use relevant labels:

feature

enhancement

UI

bugfix

documentation
