📺 MediaTracker: Full-Stack Headless Application
A modern, high-performance web application designed to track and manage personal media consumption across Manga, Manhwa, and Video Games. This project demonstrates a complete Decoupled (Headless) Architecture, separating a robust Python backend from a dynamic React-based frontend.

🏗️ Architecture Overview
Unlike traditional monolithic applications, MediaTracker utilizes a decoupled architecture:

Backend: A RESTful API built with Django REST Framework (DRF). It handles data persistence, validation, and business logic.

Frontend: A modern, server-side rendered (SSR) interface built with Next.js 15+ and React.

Communication: Systems communicate via asynchronous JSON exchanges, allowing for independent scaling and maintenance of each layer.

🛠️ Tech Stack
Backend
Language: Python

Framework: Django REST Framework

Database: PostgreSQL (Production) / SQLite (Development)

Frontend
Framework: Next.js (App Router)

Styling: Tailwind CSS (Modern Utility-First Styling)

State Management: React Hooks (useState, useEffect)

UX Enhancements: React Hot Toast (Notifications), Next.js Loading Skeletons

🚀 Key Features
Full CRUD Operations: Seamlessly Create, Read, Update, and Delete media entries across the decoupled stack.

Real-time Search: Instant, client-side filtering of media titles for a smooth user experience.

Dynamic Routing: Utilizes Next.js dynamic segments ([id]) for efficient resource editing.

Optimized UX: * Loading Skeletons: Animated pulsing states to prevent layout shift during data fetching.

Toast Notifications: Non-blocking visual feedback for database interactions.

Responsive Design: Fully mobile-responsive interface using Tailwind’s grid system.

💻 Local Setup
1. Backend Setup (Django)
Bash
cd media_tracker
python -m venv nenv
source nenv/bin/activate  # Or .\nenv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
2. Frontend Setup (Next.js)
Bash
cd frontend
npm install
npm run dev
The application will be live at http://localhost:3000.