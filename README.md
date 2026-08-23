<div align="center">

# 🐧 LinuxAtlas

### **The open Linux knowledge platform**

**Explore distributions. Learn commands. Understand your system.**

LinuxAtlas brings Linux distributions, commands, package managers, documentation, comparisons, and practical guides together into one fast, searchable, open-source platform.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)](https://hub.docker.com/r/swastik7/linuxatlas)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Black?style=for-the-badge\&logo=framer\&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br />

> **Linux is not just an operating system.**
>
> **It's a way to understand your system.**

<br />

**[🚀 Explore LinuxAtlas](https://linuxatlas.dev)** · **[📦 GitHub](https://github.com/swastikjha008-jpg/LinuxAtlas)** · **[🐳 Docker](https://hub.docker.com/r/swastik7/linuxatlas)**

</div>

---

# 🌌 What is LinuxAtlas?

Linux knowledge is everywhere.

It's in:

* Distribution wikis
* `man` pages
* Git repositories
* Stack Overflow answers
* Package documentation
* Community forums
* Random blog posts
* Terminal output from someone who knows way more than you do

The problem is that **Linux knowledge is fragmented**.

You might know that Arch uses `pacman`, but then you discover Fedora uses `dnf`, Alpine uses `apk`, Debian uses `apt`, and suddenly you're opening twelve browser tabs trying to remember which command does what.

LinuxAtlas is an attempt to make that easier.

### LinuxAtlas is a free and open-source Linux knowledge platform designed to bring the important pieces of Linux into one consistent experience.

Instead of bouncing between dozens of websites, you can use LinuxAtlas to:

🐧 Explore Linux distributions
💻 Learn Linux commands
📦 Understand package managers
📚 Read practical Linux guides
⚖️ Compare distributions
🔎 Search Linux knowledge instantly
🧠 Understand how different parts of the Linux ecosystem fit together

No account.

No subscription.

No artificial paywall around knowledge.

Just Linux.

---

# 🧭 The Philosophy

LinuxAtlas is built around a simple idea:

> **Linux knowledge should be easy to discover, understand, verify, and share.**

This project isn't meant to replace the Arch Wiki, Debian documentation, Fedora documentation, Gentoo Handbook, or official manuals.

Those resources are incredible.

LinuxAtlas is meant to provide a **consistent map of the Linux ecosystem** that helps you understand where everything fits together and points you toward deeper official documentation when you need it.

Think of it as:

```text
                 ┌───────────────────────┐
                 │      LinuxAtlas       │
                 │                       │
                 │   Explore the map     │
                 │   Understand basics   │
                 │   Find useful info    │
                 └───────────┬───────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
           Distros        Commands      Package Mgmt
              │              │              │
              └──────────────┼──────────────┘
                             │
                       Guides / Docs
                             │
                             ▼
                 Official documentation
```

LinuxAtlas is the **map**.

The official documentation remains the **deep expedition**.

---

# 🐧 What You Can Explore

Linux is not one operating system.

It's an ecosystem.

LinuxAtlas currently covers **15+ distributions**, with the architecture designed to grow far beyond that.

### Current distributions

| Distribution | Family          | Package Manager | Release Model         |
| ------------ | --------------- | --------------- | --------------------- |
| Arch Linux   | Independent     | pacman          | Rolling               |
| Ubuntu       | Debian          | apt             | LTS / Stable          |
| Debian       | Independent     | apt             | Stable                |
| Fedora       | Red Hat         | dnf             | Stable                |
| openSUSE     | Independent     | zypper          | Stable / Rolling      |
| Alpine Linux | Independent     | apk             | Stable                |
| Kali Linux   | Debian          | apt             | Rolling               |
| Linux Mint   | Ubuntu / Debian | apt             | Stable                |
| SteamOS      | Arch-based      | pacman          | Gaming-focused        |
| BlackArch    | Arch            | pacman          | Rolling               |
| Zorin OS     | Ubuntu          | apt             | Stable                |
| CachyOS      | Arch            | pacman          | Rolling               |
| Pop!_OS      | Ubuntu          | apt             | Stable                |
| Gentoo       | Independent     | Portage         | Rolling               |
| NixOS        | Independent     | nix             | Declarative / Rolling |

And the architecture is intentionally designed to make adding more distributions straightforward.

Potential future additions include:

* Manjaro
* EndeavourOS
* Garuda Linux
* elementary OS
* MX Linux
* Parrot OS
* Void Linux
* Rocky Linux
* AlmaLinux
* Tails
* Qubes OS
* Oracle Linux
* Clear Linux
* and many more

Because the Linux family tree is... let's just say **a little complicated**.

---

# 💻 Command Encyclopedia

Linux commands are simple.

Until you forget one flag.

Then you start searching:

> "linux command delete directory recursive force please"

LinuxAtlas aims to make that unnecessary.

The command encyclopedia provides:

* Command descriptions
* Syntax
* Practical examples
* Options and flags
* Distribution-specific examples
* Related commands
* Related documentation
* Package-manager context where appropriate

Examples include:

```bash
ls
```

```bash
grep
```

```bash
find
```

```bash
chmod
```

```bash
chown
```

```bash
systemctl
```

```bash
journalctl
```

```bash
curl
```

```bash
ssh
```

```bash
tar
```

And the command system is designed to grow into a much larger reference.

---

# 📦 Package Managers

One of the most useful parts of LinuxAtlas is understanding how package management differs across distributions.

For example:

### Debian / Ubuntu

```bash
sudo apt update
sudo apt install nginx
sudo apt remove nginx
```

### Arch Linux

```bash
sudo pacman -Syu
sudo pacman -S nginx
sudo pacman -R nginx
```

### Fedora

```bash
sudo dnf upgrade
sudo dnf install nginx
sudo dnf remove nginx
```

### Alpine Linux

```bash
sudo apk update
sudo apk add nginx
sudo apk del nginx
```

### openSUSE

```bash
sudo zypper refresh
sudo zypper install nginx
sudo zypper remove nginx
```

LinuxAtlas makes these differences explicit rather than assuming every Linux distribution behaves the same way.

---

# 🔎 Search

Search is one of the core features of LinuxAtlas.

Press:

```text
Ctrl + K
```

or on macOS:

```text
⌘ + K
```

and search across:

* Distributions
* Commands
* Package managers
* Guides
* Documentation

Example:

```text
> arch
```

could return:

```text
DISTROS

Arch Linux
A lightweight rolling-release distribution...

CachyOS
An Arch-based performance-focused distribution...

BlackArch
An Arch-based penetration-testing distribution...

COMMANDS

pacman
Arch Linux's package manager...

GUIDES

Installing Arch Linux
A practical installation guide...
```

The search experience is designed to be:

* Fast
* Keyboard-friendly
* Search-as-you-type
* Categorized
* Ranked
* Accessible
* Shareable through query URLs

Example:

```text
/explore?q=arch
```

---

# ⚖️ Compare Linux Distributions

Choosing a distro can become surprisingly complicated.

Do you want:

> stability?

> newer packages?

> rolling release?

> beginner friendliness?

> maximum control?

> gaming?

> security tools?

> performance tuning?

LinuxAtlas provides a comparison layer so you can inspect distributions side-by-side.

For example:

```text
                    Arch        Ubuntu       Fedora
---------------------------------------------------------
Base                —           Debian       RPM
Package Manager     pacman      apt          dnf
Release Model       Rolling     LTS/Stable   Stable
Init System         systemd     systemd      systemd
Difficulty          Advanced    Beginner     Intermediate
```

The comparison system is designed to become much more sophisticated over time.

---

# 📚 Long-Form Documentation

LinuxAtlas isn't intended to be a collection of tiny cards with two sentences each.

Distro pages are designed as structured technical documentation.

A typical distribution page can contain:

```text
Overview
History
Philosophy
Who Is It For?
Key Features
System Requirements
Installation
Post Installation
Package Management
Repositories
Desktop Environments
Filesystem
Users & Permissions
Networking
Services
systemd
Security
Updates
Software Installation
Development
Gaming
Customization
Troubleshooting
Pros & Cons
Community
Official Documentation
Related Distributions
Related Guides
```

The documentation system is intentionally structured so each distribution can have its own character.

### Arch Linux

Focuses on:

* Minimalism
* User control
* Rolling releases
* pacman
* AUR
* Arch Wiki
* Manual system configuration

### Ubuntu

Focuses on:

* Ease of use
* LTS releases
* apt
* desktop and server workloads
* Snap
* Canonical ecosystem

### Fedora

Focuses on:

* New technologies
* RPM ecosystem
* dnf
* SELinux
* GNOME
* Relationship with the Red Hat ecosystem

### Alpine Linux

Focuses on:

* Small footprint
* Containers
* musl
* BusyBox
* apk
* security-oriented minimal systems

Different distributions deserve different explanations.

---

# 🏗️ Architecture

LinuxAtlas is built to remain understandable as it grows.

The project separates:

```text
Content
   ↓
Data
   ↓
Services
   ↓
Search
   ↓
API
   ↓
UI
```

This prevents the frontend from becoming a giant collection of hardcoded Linux facts.

---

# 🛠️ Tech Stack

| Layer                | Technology            |
| -------------------- | --------------------- |
| Framework            | Next.js 15 App Router |
| UI                   | React 19              |
| Language             | TypeScript            |
| Styling              | Tailwind CSS          |
| Animation            | Framer Motion         |
| Components           | shadcn/ui             |
| Icons                | Lucide                |
| Database             | PostgreSQL            |
| ORM                  | Prisma 6              |
| Validation           | Zod                   |
| Documentation        | MDX                   |
| Markdown             | react-markdown        |
| Search               | Fuse.js / Meilisearch |
| Containerization     | Docker                |
| Local Infrastructure | Docker Compose        |
| Deployment           | Vercel / Docker host  |
| Package Manager      | npm / pnpm            |
| Version Control      | Git                   |

---

# 🧩 Project Structure

The project is organized so frontend, backend, data, and content responsibilities remain separated.

```text
LinuxAtlas/
│
├── app/
│   ├── api/
│   │   ├── commands/
│   │   ├── distros/
│   │   ├── guides/
│   │   ├── package-managers/
│   │   └── search/
│   │
│   ├── commands/
│   ├── distros/
│   ├── guides/
│   ├── package-managers/
│   ├── compare/
│   └── explore/
│
├── components/
│   ├── brand/
│   ├── docs/
│   ├── distro/
│   ├── landing/
│   ├── layout/
│   ├── search/
│   ├── terminal/
│   └── ui/
│
├── content/
│   ├── distros/
│   ├── commands/
│   ├── guides/
│   └── package-managers/
│
├── lib/
│   ├── content/
│   ├── search/
│   ├── server/
│   └── types.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── docs/
│   └── backend.md
│
├── scripts/
│   ├── seed/
│   ├── sync/
│   └── verify/
│
├── public/
│
├── docker-compose.yml
├── Dockerfile
├── next.config.*
├── package.json
└── README.md
```

The exact structure may evolve as the project grows, but the principle stays the same:

> **Keep responsibilities separated.**

---

# 🗄️ Data Architecture

LinuxAtlas uses PostgreSQL for structured data.

The database is responsible for things such as:

* distribution metadata
* relationships
* package managers
* commands
* examples
* guides
* comparison data
* related content
* source metadata

Long-form technical documentation is maintained through MDX.

This keeps technical writing pleasant to edit while allowing structured metadata to live in PostgreSQL.

---

# 📝 Why MDX?

Documentation is code-adjacent content.

We want to be able to write something like:

```mdx
# Arch Linux

Arch Linux is an independently developed,
general-purpose Linux distribution.
```

and then enrich it with:

* Code blocks
* Notes
* Warnings
* Tips
* Links
* Diagrams
* Interactive components

without stuffing giant HTML blobs into a database.

This also means documentation can be reviewed through pull requests.

Which is exactly what we want for an open-source knowledge project.

---

# 🔍 Search Architecture

LinuxAtlas supports interchangeable search implementations.

### Local development

Fuse.js can provide fast local search without requiring another service.

### Production / larger datasets

Meilisearch can provide:

* typo tolerance
* ranking
* filtering
* fast prefix search
* large searchable indexes

The frontend does not care which implementation is being used.

The search layer sits behind a common adapter.

```text
                Search API
                    │
             Search Service
                    │
          ┌─────────┴─────────┐
          │                   │
       Fuse.js            Meilisearch
       local                 prod
```

That makes the search system replaceable without rebuilding the frontend.

---

# 🐳 Docker

LinuxAtlas is designed to be easy to run locally.

The local development stack can include:

```text
LinuxAtlas
    │
    ├── Next.js
    │
    ├── PostgreSQL
    │
    └── Meilisearch
```

Start infrastructure with:

```bash
docker compose up -d
```

Then run the application normally.

---

# 🚀 Getting Started

## Prerequisites

You'll need:

* Node.js 20+
* npm or pnpm
* Git
* Docker Desktop

Docker is recommended because PostgreSQL and search infrastructure can be started locally without installing them directly on your machine.

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

Or pnpm:

```bash
pnpm install
```

---

## 3. Start infrastructure

```bash
docker compose up -d
```

This can start the local PostgreSQL and Meilisearch services.

Check running containers:

```bash
docker ps
```

---

## 4. Configure environment variables

Create:

```bash
cp .env.example .env
```

Then configure:

```env
DATABASE_URL="postgresql://linuxatlas:linuxatlas@localhost:5432/linuxatlas?schema=public"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

MEILISEARCH_HOST="http://localhost:7700"

MEILISEARCH_API_KEY="YOUR_MEILISEARCH_API_KEY"
```

Never commit the real `.env` file.

---

# 🧬 Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

At this point the database should contain the initial LinuxAtlas dataset.

---

# ▶️ Run Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

You should be greeted by LinuxAtlas.

---

# 🐳 Run with Docker

A Docker image is published here:

**Docker Hub:**
https://hub.docker.com/r/swastik7/linuxatlas

Pull it:

```bash
docker pull swastik7/linuxatlas
```

Run it:

```bash
docker run \
  -p 3000:3000 \
  --env-file .env \
  swastik7/linuxatlas
```

Make sure your `DATABASE_URL` points to a reachable PostgreSQL instance.

This could be:

* local Docker PostgreSQL
* Neon
* Supabase
* a VPS
* another managed PostgreSQL provider

---

# 🧪 Verification

LinuxAtlas includes verification utilities for the data layer.

Run:

```bash
npm run verify:seed
```

This checks things like:

* duplicate slugs
* broken references
* malformed seed data

Run search verification:

```bash
npm run verify:search
```

This exercises the search adapter and ranking behavior.

Validate API inputs:

```bash
npm run verify:validation
```

This checks the project's Zod schemas.

Before opening a PR, it's a good idea to run all of them.

---

# 🔌 API

LinuxAtlas exposes a set of read-focused APIs.

Examples:

```http
GET /api/distros
```

```http
GET /api/distros/arch-linux
```

```http
GET /api/commands
```

```http
GET /api/commands/systemctl
```

```http
GET /api/guides
```

```http
GET /api/package-managers
```

```http
GET /api/search?q=arch
```

Compare distributions:

```http
GET /api/compare?distros=arch-linux,ubuntu,fedora
```

The API is intentionally focused on serving the knowledge layer.

There is no unnecessary authentication layer sitting between you and a page explaining what `chmod` does.

---

# 🧠 Search Example

A search for:

```text
docker
```

might return:

```text
DISTROS

Ubuntu
Arch Linux
Fedora
Alpine Linux

COMMANDS

docker
systemctl
docker-compose

GUIDES

Running Docker on Linux
Containers explained

PACKAGE MANAGERS

apt
pacman
dnf
apk
```

The goal is not just to find exact titles.

The search system should help users discover related Linux knowledge.

---

# 🧭 Routing

LinuxAtlas uses a predictable URL structure.

```text
/
```

Landing page.

```text
/explore
```

Search and discovery.

```text
/distros
```

All Linux distributions.

```text
/distros/arch-linux
```

Arch Linux documentation.

```text
/commands
```

Command encyclopedia.

```text
/commands/systemctl
```

Command documentation.

```text
/package-managers
```

Package manager reference.

```text
/guides
```

Linux learning guides.

```text
/compare
```

Distribution comparison.

This makes pages easy to bookmark and share.

---

# 🎨 Design Philosophy

LinuxAtlas intentionally avoids the standard "documentation website" aesthetic.

The visual system combines:

🌌 Cinematic dark atmosphere
🪟 Subtle glassmorphism
💻 Terminal-inspired interfaces
🔵 Cyan technical accents
🔥 Warm orange highlights
📚 Dense but readable documentation
✨ Smooth, restrained animation

The interface should feel like:

> **A Linux workstation turned into a knowledge platform.**

Not:

> "Yet another dashboard template."

---

# ⌨️ Keyboard First

Linux users tend to appreciate keyboards.

So LinuxAtlas should too.

Global search:

```text
Ctrl + K
⌘ + K
```

Search navigation:

```text
↑
↓
Enter
Esc
```

Copy code:

```text
Click / keyboard interaction
```

Documentation should remain keyboard navigable as well.

The goal is for experienced users to move through the platform without constantly reaching for the mouse.

---

# 🧑‍💻 For Linux Geeks

This project is intentionally built for people who enjoy understanding what happens under the hood.

You should be able to jump from:

```text
Arch Linux
      ↓
pacman
      ↓
systemd
      ↓
journalctl
      ↓
Linux filesystem
      ↓
permissions
      ↓
SSH
      ↓
networking
```

and keep learning.

Linux knowledge is interconnected.

LinuxAtlas should reflect that.

---

# 🧬 The Linux Family Tree

Linux distributions are deeply interconnected.

A simplified view:

```text
                    Linux
                      │
        ┌─────────────┼─────────────┐
        │             │             │
      Debian         Arch          Red Hat
        │             │             │
    ┌───┴───┐     ┌───┼────┐    ┌──┴────┐
    │       │     │   │    │    │       │
 Ubuntu   Mint   Arch CachyOS BlackArch Fedora
    │       │
 Pop!_OS  ...
```

LinuxAtlas aims to make these relationships visible.

Understanding the family tree helps explain why distributions often share:

* package formats
* package managers
* tooling
* filesystem conventions
* documentation
* communities
* design philosophies

---

# 🧪 Development Philosophy

LinuxAtlas itself follows a few principles.

### Small pieces

Prefer focused components and services over giant files.

### Explicit systems

Make the architecture understandable.

### No magic where unnecessary

A developer should be able to inspect the code and understand what is happening.

### Open data structures

Linux information should be represented in predictable schemas.

### Good documentation

The project should document itself as carefully as it documents Linux.

### Performance

Static content where possible.

Dynamic behavior where useful.

No JavaScript just because we can.

---

# 🛡️ Security Principles

LinuxAtlas is a documentation platform.

It does **not** execute commands submitted by users.

Never assume a command shown in documentation should be executed automatically.

The backend:

* validates inputs
* uses Prisma for database access
* protects secrets
* keeps database credentials server-side
* validates query parameters
* avoids raw user-controlled SQL
* keeps private search keys away from the client

Documentation is information.

Not remote code execution. 😄

---

# 🔭 Roadmap

LinuxAtlas is intentionally designed to grow.

## Phase 1 — Foundation

✅ Landing page
✅ Distribution explorer
✅ Command encyclopedia
✅ Package manager reference
✅ Guides
✅ Compare page
✅ Search
✅ PostgreSQL
✅ Prisma
✅ MDX
✅ Docker
✅ Open-source architecture

---

## Phase 2 — Bigger Linux Knowledge Base

* [ ] 30+ distributions
* [ ] 100+ Linux commands
* [ ] More package managers
* [ ] More long-form guides
* [ ] More distro comparisons
* [ ] Better cross-distro command translation
* [ ] More distro family relationships

---

## Phase 3 — Interactive Learning

Potential future features:

* [ ] Linux filesystem explorer
* [ ] Permission calculator
* [ ] Interactive `chmod` builder
* [ ] Process tree visualizer
* [ ] systemd dependency visualizer
* [ ] boot process visualization
* [ ] networking concepts explorer
* [ ] shell playground
* [ ] package manager comparison tool

---

## Phase 4 — Community

Potential future community functionality:

* [ ] Community corrections
* [ ] Documentation proposals
* [ ] GitHub issue integration
* [ ] Content review workflow
* [ ] Contributor acknowledgements
* [ ] Translation support

Accounts are not required for the core experience.

The knowledge should remain public.

---

# 🤝 Contributing

LinuxAtlas is open source because Linux itself is built on decades of open collaboration.

Contributions are welcome.

You can contribute by:

### 🐧 Adding a distribution

Add missing information about a Linux distribution.

### 📚 Improving documentation

Fix explanations.

Clarify confusing sections.

Add examples.

Correct outdated information.

### 💻 Adding commands

Document useful Linux commands.

### 📦 Improving package manager coverage

Add package manager behavior and cross-distro examples.

### 🎨 Improving the UI

Make the platform easier and more enjoyable to use.

### 🐛 Fixing bugs

Something broken?

Open an issue.

### 🔎 Improving search

Search quality is important.

Better ranking, indexing, filters, and typo handling are all welcome.

---

# 📝 Contribution Workflow

A typical contribution looks like:

```bash
git clone https://github.com/swastikjha008-jpg/LinuxAtlas.git

cd LinuxAtlas

git checkout -b feature/add-my-distro
```

Make your changes.

Run tests / verification scripts.

Then:

```bash
git add .
git commit -m "docs: add distribution documentation"
git push origin feature/add-my-distro
```

Open a Pull Request.

---

# 📐 Documentation Guidelines

When adding technical information:

### Prefer official sources

Use:

* official distro documentation
* official wikis
* official manuals
* official project repositories

### Avoid copying documentation

LinuxAtlas should explain concepts in its own words.

Link to the original source for deeper reading.

### Be precise

Linux users will notice when you say:

> "just run this"

without explaining what it actually does.

### Explain commands

Instead of:

```bash
chmod 755 file
```

explain what:

```text
755
```

actually means.

That's what makes documentation useful.

---

# 🌐 Source Verification

Where appropriate, LinuxAtlas can store metadata about where information came from.

For example:

```text
Source:
Arch Linux Wiki

Last verified:
2026-08-23
```

The goal is to make technical information easier to trust and maintain.

---

# 💡 Why Build This?

Because Linux is huge.

And confusing.

And fascinating.

There are distributions designed for:

* beginners
* developers
* servers
* gaming
* security research
* embedded systems
* containers
* privacy
* performance
* education
* scientific workloads

There are different:

* init systems
* package managers
* release models
* desktop environments
* filesystems
* shells
* service managers
* security systems
* configuration approaches

It is easy to get lost.

LinuxAtlas exists to make the landscape easier to understand.

---

# 🐧 A Few Linux Facts

Because no Linux project README should be completely serious.

```text
You started with Ubuntu.

You installed Arch.

You broke Arch.

You installed Arch again.

You tried Gentoo.

You discovered compilation.

You went back to Arch.

You installed Hyprland.

Your rice now looks better than your actual desktop.

You installed Docker.

Your disk disappeared.

You ran docker system prune.

Everything is fine again.

You are now a Linux user.
```

---

# 🖥️ Terminal Energy

LinuxAtlas uses terminal-inspired UI elements throughout the project.

For example:

```text
┌─────────────────────────────────────────────────────┐
│ ● ● ●   arch2099@2099 — zsh                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ~ $ arch2099 install --profile developer            │
│                                                     │
│ Resolving package graph... done                     │
│ Provisioning btrfs subvolumes... done               │
│ Applying kernel... done                              │
│ System ready.                                       │
│                                                     │
│ ~ $ systemctl                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Some of these visuals are illustrative rather than literal commands.

They're here because Linux has a visual language.

And terminals are a huge part of it.

---

# 📊 Current Project Scope

At the moment LinuxAtlas provides:

```text
15+        Linux distributions
10+        Core commands
5+         Package managers
10+        Guides
1          Global command palette
1          Distribution comparison system
1          Search architecture
1          Open-source codebase
∞          Linux rabbit holes
```

That last number is probably the most accurate one.

---

# 🚧 Status

LinuxAtlas is actively being developed.

The architecture is intentionally evolving toward:

```text
                  LinuxAtlas
                      │
          ┌───────────┼───────────┐
          │           │           │
       Distros     Commands    Guides
          │           │           │
          └───────────┼───────────┘
                      │
                  Search
                      │
                  PostgreSQL
                      │
                   MDX Docs
```

The long-term goal is a platform where Linux information can grow without the codebase turning into an unmaintainable collection of hardcoded pages.

---

# 🌍 Open Source

LinuxAtlas is released under the **MIT License**.

That means you are free to:

* use it
* modify it
* fork it
* learn from it
* self-host it
* build on it
* contribute to it

The project belongs in the open.

---

# 📜 License

LinuxAtlas is licensed under the MIT License.

See:

[`LICENSE`](LICENSE)

---

# 🔗 Links

**Repository**

https://github.com/swastikjha008-jpg/LinuxAtlas

**Docker Hub**

https://hub.docker.com/r/swastik7/linuxatlas

**Documentation**

[`docs/backend.md`](docs/backend.md)

---

# 🙌 Built in the Open

LinuxAtlas is built by **swastikjha008-jpg** with the goal of turning a simple idea into a genuinely useful open-source Linux resource.

Built with:

```text
TypeScript
Next.js
React
PostgreSQL
Prisma
MDX
Docker
Framer Motion
A ridiculous amount of terminal commands
and probably too much time spent tweaking CSS
```

Because that's what open-source projects are for.

---

<div align="center">

## 🐧 Explore Linux. Understand Linux. Build with Linux.

### **LinuxAtlas**

**Open knowledge for an open operating system.**

<br />

⭐ Star the repository if you like the project.

🐛 Found a bug? Open an issue.

💡 Have an idea? Start a discussion.

🧑‍💻 Want to contribute? Send a pull request.

<br />

**Made for Linux users. Built in the open.**

</div>
