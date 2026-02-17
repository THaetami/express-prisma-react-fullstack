## Project Expressjs | Prisma | Postgres

### Laundry Rest API for [here](https://github.com/THaetami/laundry)

## 📋 Project Setup

### Prerequisites

- Docker & Docker Compose installed

### 1. **Initial Setup**

Clone the repository:

```sh
git clone <repository-url>
cd laundry-api
```

### 1. **Create Environment File**

Copy and edit the environment file:

```sh
cp .env.example .env
```

Edit `.env` with your configuration:

```env
JWT_SECRET_KEY=djfhdfdjfkdfjuiuireUIHJQHEJUQUEBJhisj
JWT_EXPIRES_IN=2700

DATABASE_URL="postgresql://laundry:rahasia@db:5432/laundry-api?schema=public"
POSTGRES_PASSWORD=rahasia
POSTGRES_USER=laundry
POSTGRES_DB=laundry-api
```

---

## 🐳 Development Setup (With Docker) - RECOMMENDED

### 1. **Start Docker Containers**

Build and start the containers:

```sh
docker-compose -f docker-compose.dev.yml up --build
```

### 2. **Database Migration**

Run this command in a new terminal:

```sh
docker compose -f docker-compose.dev.yml run --rm app npm run migrate
```

### 3. **Database Seeder**

Run this command in a new terminal:

```sh
docker compose -f docker-compose.dev.yml run --rm app npm run seed
```

This will:

- ✅ Run migrations
- ✅ Seed the database with initial data

## 🏗️ Production Setup (With Docker) - RECOMMENDED

### 1. **Start Docker Containers**

Build and start the containers:

```sh
docker-compose -f docker-compose.prod.yml up --build
```

### 2. **Database Migration**

Run this command in a new terminal:

```sh
docker compose -f docker-compose.prod.yml run --rm app npm run migrate:prod
```

### 4. **Database Seeder**

Run this command in a new terminal:

```sh
docker compose -f docker-compose.prod.yml run --rm app npm run seed:prod
```

This will:

- ✅ Run migrations
- ✅ Seed the database with initial data

## **Access the Application**

Open your browser and go to:

- **API Base URL**: [http://localhost:8888](http://localhost:8888)

---

**Happy Coding! 🚀**
