# FlowNexus Backend

## Overview
FlowNexus backend powers an employee productivity reporting system.

Employees submit daily reports while managers track team activity, analytics, and reporting deadlines.

Built using Django and Django REST Framework with JWT authentication.

---

## Tech Stack

- Python
- Django
- Django REST Framework
- SimpleJWT (JWT authentication)
- SQLite (development)

---

## Architecture

User
 └── EmployeeProfile
      └── Team
           ├── manager
           ├── deadline
           └── employees
                └── DailyReport

---

## Core Features

### Authentication
- JWT login
- Token refresh

### Team Management
- Teams with assigned managers
- Manager configurable reporting deadlines

### Reporting System
- Employees submit daily reports
- Users can view their own reports
- Managers can view reports of employees in their teams

### Analytics
- Manager dashboard
- Daily report submission status
- Weekly productivity summary
- Deadline based report classification
  - on_time
  - late
  - missing

---

## Important API Endpoints

### Authentication

POST /api/login/  
POST /api/token/refresh/

### Reports

GET /api/  
POST /api/  
GET /api/my-reports/  
GET /api/team-reports/

### Analytics

GET /api/dashboard/  
GET /api/report-status/  
GET /api/weekly-summary/

### Team Configuration

PATCH /api/team/<team_id>/deadline/

---

## Backend Folder Structure

backend/
│
├── apps/
│   ├── users/
│   ├── employees/
│   ├── teams/
│   └── reports/
│
├── flownexus/
│   ├── settings.py
│   ├── urls.py
│
└── manage.py

---

## Current Status

The backend currently includes:

- Authentication system
- Employee and team management
- Daily reporting workflow
- Manager analytics dashboard
- Deadline tracking and configuration

---

## Next Steps

- Add Swagger API documentation
- Build frontend dashboard
- Deploy backend