![CI](https://github.com/jparker0517/issue-tracker-lite-sqlite/actions/workflows/ci.yml/badge.svg)

# 📋 Issue Tracker Lite (SQLite)

A lightweight full-stack issue tracking application built with **Node.js**, **Express**, and **SQLite**. Designed to demonstrate clean architecture, professional workflows, and deployment best practices.

---

## 🚀 Live Demo  
**[Try it on Render](https://your-live-demo-link.com)**  

---

## 📌 Features
- **Create, Read, Update, and Delete** issues
- **Persistent storage** with SQLite  
- **RESTful API** structure  
- Simple, intuitive interface for quick issue tracking  
- **Fully tested** with automated CI on every push  

---

## 🛠 Tech Stack
**Frontend:**  
- HTML5, CSS3, Vanilla JavaScript

**Backend:**  
- Node.js  
- Express.js  
- SQLite  

**DevOps / Tooling:**  
- GitHub Actions (CI)  
- ESLint for code quality  
- npm for dependency management  

---

## ⚙️ Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/jparker0517/issue-tracker-lite-sqlite.git
cd issue-tracker-lite-sqlite
```

**2. Install dependencies**
```bash
npm install
```

**3. Run locally**
```bash
npm start
```

**4. Run tests**
```bash
npm test
```

---

## 🧪 Continuous Integration
This project uses **GitHub Actions** for automated testing:  
- Runs on Node 20  
- Caches dependencies for faster builds  
- Executes unit tests for backend logic  

---

## 📂 Project Structure
```
issue-tracker-lite-sqlite/
│
├── public/           # Static frontend files
├── routes/           # API endpoints
├── tests/            # Automated tests
├── .github/workflows # CI/CD config
├── server.js         # Entry point
└── README.md
```

---

## 📝 What I Learned
- Setting up a complete CI pipeline with **GitHub Actions**  
- Implementing REST APIs with Express and SQLite  
- Managing dependencies and environment consistency with lockfiles  
- Writing clear, maintainable code with linting and tests  
- Deploying to a live environment for instant access  

---

## 📜 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
