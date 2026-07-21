# AWS DevOps Task Manager API

A RESTful Task Manager API built with Node.js, Express.js, PostgreSQL, Docker, and deployed on AWS EC2.

---

## Features

- RESTful CRUD API
- PostgreSQL Database
- Docker Containerization
- Docker Compose
- GitHub Actions CI
- AWS EC2 Deployment

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- GitHub Actions
- AWS EC2

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Welcome message |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## Run Locally

```bash
npm install
npm start
```

---

## Run with Docker

```bash
docker compose up -d
```

---

## Deployment

The application is deployed on an AWS EC2 Ubuntu instance using Docker Compose.

Public URL:

```
http://13.203.221.199:3000
```
# AWS DevOps Project
