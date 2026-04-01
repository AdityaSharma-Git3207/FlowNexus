# FlowNexus Database Design

## Overview

FlowNexus is a team workflow intelligence platform that allows employees to submit daily work reports and enables managers to track team productivity through dashboards and analytics.

The system supports three types of users:

- Admin
- Manager
- Employee

The main entities in the system are:

- User
- Team
- EmployeeProfile
- DailyReport

These entities define how users, teams, and reports interact in the system.

---

# Entity Relationship Overview

High-level relationship structure:

```
Team
 ├── Manager (User)
 └── Employees (EmployeeProfile)

EmployeeProfile
 └── DailyReport

User
 └── EmployeeProfile
```

Meaning:

- A User can be an Admin, Manager, or Employee.
- A Team has one Manager.
- A Team contains multiple Employees.
- An EmployeeProfile belongs to one User.
- An EmployeeProfile can submit multiple DailyReports.

---

# 1. User

The User model represents all authenticated users in the system.

A custom user model will be created using Django's AbstractUser to allow role-based access control and additional fields.

## Fields

id  
Primary key

email  
Unique email used for login

username  
Required for Django authentication

password  
Hashed password

first_name  

last_name  

role  
Defines the user role

Possible values:
ADMIN  
MANAGER  
EMPLOYEE

is_active  
Boolean indicating whether the user account is active

date_joined  
Timestamp when the account was created

## Relationships

User  
 └── OneToOne → EmployeeProfile

Only employees require an EmployeeProfile.

---

# 2. Team

The Team model represents a group of employees managed by a manager.

Examples:

- Engineering Team
- Sales Team
- Marketing Team

## Fields

id  
Primary key

name  
Name of the team

manager  
ForeignKey → User

created_at  
Timestamp when the team was created

## Relationships

Team  
 ├── Manager → User  
 └── Employees → EmployeeProfile

---

# 3. EmployeeProfile

EmployeeProfile stores employee-specific information that should not be stored directly in the User model.

This separates authentication data from employee information.

## Fields

id  
Primary key

user  
OneToOne → User

team  
ForeignKey → Team

designation  
Employee job title

joined_date  
Date when the employee joined the company

## Relationships

EmployeeProfile  
 ├── belongs to → User  
 └── belongs to → Team

---

# 4. DailyReport

DailyReport is the core entity of FlowNexus.

Employees submit daily reports describing their work activity.

Managers can view these reports to monitor productivity.

## Fields

id  
Primary key

employee  
ForeignKey → EmployeeProfile

date  
Date of the report

tasks_completed  
Text field describing completed tasks

hours_worked  
Number of hours worked

blockers  
Optional description of issues faced during work

notes  
Additional comments

created_at  
Timestamp when the report was submitted

## Relationships

DailyReport  
 └── belongs to → EmployeeProfile

An employee can submit multiple reports.

---

# Role-Based Access Rules

## Admin

Admin users can:

- create teams
- manage users
- assign managers
- view all reports

---

## Manager

Managers can:

- view reports from employees in their team
- monitor team productivity
- access dashboards and analytics

Managers cannot view reports outside their team.

---

## Employee

Employees can:

- submit daily reports
- view their own reports

Employees cannot view reports of other employees.

---

# Future Extensions (Not in MVP)

These features may be implemented in later versions.

## Custom Report Fields

Organizations may define custom reporting fields such as:

- calls_made
- sales_closed
- bugs_fixed
- meetings_attended

Possible implementation:

ReportFieldDefinition  
ReportFieldValue

---

## File Attachments

Employees may upload files with reports such as:

- screenshots
- documents
- receipts

Possible model:

ReportAttachment

---

# Database Summary

User  
Authentication and role management

Team  
Organizes employees into groups

EmployeeProfile  
Stores employee-specific information

DailyReport  
Stores daily work reports submitted by employees

---

# Conclusion

This database schema provides the foundation for the FlowNexus workflow tracking system.

It supports:

- role-based access control
- team management
- daily reporting
- manager dashboards
- future extensibility