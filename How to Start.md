# 🚀 Getting Started

There are **two ways** to run LinuxAtlas:

1. **Docker — recommended** for quickly running the project.
2. **Local development** if you want to work on the code.

---

# 🐳 Run LinuxAtlas with Docker

This is the easiest way to run LinuxAtlas.

### Prerequisites

You only need:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* Git

Make sure Docker Desktop is running.

---

## 1. Clone the repository

```bash
git clone https://github.com/swastikjha008-jpg/LinuxAtlas.git
cd LinuxAtlas
```

---

## 2. Create your environment file

Copy the example environment file:

```bash
cp .env.example .env
```

Then open `.env` and configure your database connection.

For the included Docker PostgreSQL setup, use:

```env
DATABASE_URL="postgresql://linuxatlas:linuxatlas@db:5432/linuxatlas?schema=public"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

MEILISEARCH_HOST="http://meilisearch:7700"
MEILISEARCH_API_KEY="YOUR_MEILISEARCH_API_KEY"
```

> Keep secrets in `.env`.
>
> Never commit `.env` to Git.

---

## 3. Start the complete stack

LinuxAtlas uses:

```text
                LinuxAtlas
                    │
          ┌─────────┼─────────┐
          │         │         │
       Next.js   PostgreSQL  Meilisearch
```

Start everything with:

```bash
docker compose up -d
```

Docker Compose will start the required services.

Check that everything is running:

```bash
docker compose ps
```

You should see the LinuxAtlas application and its supporting services running.

---

## 4. Open LinuxAtlas

Go to:

```text
http://localhost:3000
```

That's it.

The Docker setup is intended to handle the application startup, database initialization, Prisma migrations, and seed data automatically.

---

## 🛑 Stop LinuxAtlas

To stop the stack:

```bash
docker compose down
```

To stop and remove the database volume as well:

```bash
docker compose down -v
```

> **Warning:** `-v` removes the PostgreSQL data volume. Use it only when you want to completely reset the local database.

---

## 🔄 Rebuild after code changes

If you change the source code or Docker configuration:

```bash
docker compose up -d --build
```

---

## 📋 Useful Docker commands

Check running services:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs -f app
```

View PostgreSQL logs:

```bash
docker compose logs -f db
```

View all logs:

```bash
docker compose logs -f
```

Restart LinuxAtlas:

```bash
docker compose restart app
```

---

# 🐳 Using the Published Docker Image

A prebuilt LinuxAtlas image is available on Docker Hub:

**Docker Hub:**
https://hub.docker.com/r/swastik7/linuxatlas

Pull it with:

```bash
docker pull swastik7/linuxatlas:latest
```

For the simplest experience, use the repository's `docker-compose.yml` rather than running the application image by itself, because LinuxAtlas requires PostgreSQL.

---

# 🧑‍💻 Local Development

Use this setup when you want to modify LinuxAtlas itself.

### Prerequisites

* Node.js 20+
* npm or pnpm
* Git
* Docker Desktop

---

## 1. Clone the repository

```bash
git clone https://github.com/swastikjha008-jpg/LinuxAtlas.git
cd LinuxAtlas
```

---

## 2. Install dependencies

Using npm:

```bash
npm install
```

or pnpm:

```bash
pnpm install
```

---

## 3. Start PostgreSQL and Meilisearch

```bash
docker compose up -d db meilisearch
```

Check:

```bash
docker compose ps
```

---

## 4. Configure environment variables

```bash
cp .env.example .env
```

For local development:

```env
DATABASE_URL="postgresql://linuxatlas:linuxatlas@localhost:5432/linuxatlas?schema=public"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

MEILISEARCH_HOST="http://localhost:7700"

MEILISEARCH_API_KEY="YOUR_MEILISEARCH_API_KEY"
```

---

## 5. Set up Prisma

Generate the Prisma client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

---

## 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧬 Database

LinuxAtlas uses PostgreSQL for structured data such as:

* distributions
* commands
* package managers
* guides
* relationships
* comparison data
* metadata

Long-form documentation is stored as MDX.

For a clean local reset:

```bash
docker compose down -v
docker compose up -d db meilisearch

npx prisma migrate dev
npx prisma db seed
```

> **Warning:** Removing the volume deletes your local PostgreSQL data.

---

# 🐧 Quick Start

For someone who simply wants to run LinuxAtlas locally:

```bash
git clone https://github.com/swastikjha008-jpg/LinuxAtlas.git
cd LinuxAtlas
cp .env.example .env
docker compose up -d
```

Then open:

```text
http://localhost:3000
```

### That's the whole point.

No manual database installation.

No separate PostgreSQL setup.

No manually creating tables.

No hunting through configuration files.

**Docker does the boring stuff. You explore Linux. 🐧**
