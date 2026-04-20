# QueueLess

QueueLess is a full-stack smart waiting time and slot prediction system for colleges, hospitals, banks, and canteens.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, shadcn-style reusable UI components
- Backend: NestJS, TypeScript, Prisma ORM, Socket.IO
- Database: Supabase PostgreSQL
- Auth: JWT with role-based access (`USER`, `ADMIN`)

## Project Structure

```txt
Queueless/
  frontend/
  backend/
```

## Backend Modules

- `auth`
- `users`
- `services`
- `queue`
- `slots`
- `bookings`
- `admin`
- `analytics`
- `websocket`

## REST API Routes

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /users/me`
- `GET /services`
- `GET /services/:id`
- `POST /services` (admin)
- `PATCH /services/:id` (admin)
- `GET /slots/service/:serviceId`
- `POST /slots` (admin)
- `GET /queue/service/:serviceId`
- `PATCH /queue/service/:serviceId` (admin)
- `POST /bookings`
- `GET /bookings/my`
- `GET /admin/dashboard` (admin)
- `GET /analytics/overview` (admin)

## Realtime Events

- Socket event emitted by backend: `queue.updated`

## Database Tables

- `users`
- `services`
- `slots`
- `bookings`
- `queue_logs`
- `service_time_history` (optional)

## Environment Setup

### Backend

```bash
cd backend
cp .env.example .env
```

Set `DATABASE_URL` to Supabase PostgreSQL connection string and set a strong `JWT_SECRET`.

### Frontend

```bash
cd frontend
cp .env.example .env.local
```

## Prisma Setup and Seed

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Run Backend

```bash
cd backend
npm run start:dev
```

Backend runs on `http://localhost:4000`.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Waiting Time Formula

```txt
waiting_time = current_queue_length * avg_service_time
```
