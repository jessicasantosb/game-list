<p align="center">
  <img src="https://img.icons8.com/fluency/48/node-js.png" width="50"/>
  <img src="https://img.icons8.com/color/48/typescript.png" width="50"/>
  <img src="https://img.icons8.com/?size=100&id=tBBf3P8HL0vR&format=png&color=000000" width="50"/>
</p>

<h1 align="center">Desafio 3 - Game List</h1>

## [➡️ ✨ AWS EC2 Deploy ✨ ⬅️](https://)

## ⚙️ Installation

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker & Docker Compose](https://docs.docker.com/compose/install/)
- [NGINX](https://nginx.org/) (optional, it's already on container)
- [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/)
- A database (ex: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local)

## Steps

```bash
# Clone the repository
git clone git@github.com:jessicasantosb/AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList.git

# Navigate to the folder
cd AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList

# Install dependencies (use either npm or yarn)
yarn

# Build and start all containers with Docker Compose
docker compose up --build
```

---

## 🤖 Environment Variables

```bash
Create a .env file in the root of the backend folder with the following content:

PORT={your_port}
JWT_SECRET={your_secret_key}
DATABASE_URL=postgresql://user:password@localhost:5432/database

```

```bash
Create a .env file in the root of the frontend folder with the following content:

VITE_API_URL=/api

```

---

## 💻 Technologies Used

- **Node.js**
- **TypeScript**
- **React**
- **Express**
- **Cors**
- **MongoDB + Mongoose**
- **JWT**
- **Bcrypt**
- **Vite**
- **JWT-decode**
- **Axios**
- **tsx**
- **ESLint + Prettier**

---

## 🚀 How to Access

- Frontend: http://localhost (NGINX proxyando frontend e backend via /api)
- Backend API health check: http://localhost/api/health
- Previous challenge (without using NGINX): **[DESAFIO 2](https://github.com/Giron-jpg/AWS_FS_ABR25_D02_COMPASS_Game_List)**
---

## ⚠️ Notes

- Make sure the backend is listening on 0.0.0.0 to accept external connections from NGINX.
- The frontend uses /api as a prefix for API calls, which NGINX forwards to the backend.
- To run the frontend locally without Docker, you can use Vite’s proxy to http://localhost:8888 on port 5173 (see vite.config.js).
