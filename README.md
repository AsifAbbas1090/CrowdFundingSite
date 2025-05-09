# 🌍 CrowdFunding Platform

*A modern, full-stack crowdfunding web application built to empower creators, connect backers, and bring bold ideas to life.*

---

## 🚀 What is This?

Welcome to **CrowdFunding**, a sleek, developer-built crowdfunding platform by [AsifAbbas1090](https://github.com/AsifAbbas1090). Think of it as a minimalist, lightning-fast alternative to Kickstarter — perfect for launching ideas, raising donations, and sharing powerful stories.

Built with Django & React, it's designed for **clarity, speed, and scalability**. Whether you're building a tech startup, supporting a cause, or exploring your first open-source project — this app has your back.

---

## ✨ Features

- 🧑‍💼 **User Authentication** — Register, log in, and manage your account.
- 📝 **Create & Manage Campaigns** — Launch fundraising campaigns in minutes.
- 💳 **Stripe Integration** — Secure, real-time donations.
- 📷 **Image Upload** — Make your campaigns visually compelling.
- 🔍 **Browse Campaigns** — Discover active causes and ideas.
- 📈 **Campaign Progress** — Track donations and supporter activity.
- ⚙️ **Admin Dashboard** — Control everything from a Django-powered backend.

---

## 🛠 Tech Stack

### 🎨 Frontend:
- **React** + **Vite** — Fast and modular SPA setup
- **Tailwind CSS** — Utility-first styling for responsive design
- **React Router** — Seamless navigation
- **Fetch API** — Communicating with the backend via REST

### ⚙️ Backend:
- **Django 5** + **Django REST Framework** — Robust API and admin
- **SQLite** — Plug-and-play local development
- **Stripe API** — Payment processing integration
- **JWT Auth** + **CORS Enabled**

---

## 📁 Project Structure

```bash
CrowdFundingSite/
│
├── backend/                 # Django project
│   ├── campaigns/           # App: models, views, serializers
│   ├── db.sqlite3           # Local development database
│   └── settings.py          # CORS, Stripe, JWT config
│
├── my-react-app/            # React frontend
│   ├── src/                 # Pages, components, API utils
│   ├── .env                 # API URLs and env vars
│   └── build/               # Production-ready frontend build

Backend

cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend
cd ../my-react-app
npm install
npm run dev
Why This Exists
---------------
This project started as a learning exercise and turned into a polished, scalable crowdfunding platform. It’s not just a CRUD app — it’s a bridge between creators and supporters.

Want to Contribute?
-------------------
Open issues, fork it, or drop feedback. Let’s make crowdfunding cleaner, faster, and dev-friendly.

License
-------
MIT — free to use, tweak, and launch your own movement.
