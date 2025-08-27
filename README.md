<p align="center"> 
    <img src="https://img.icons8.com/color/48/docker.png" width="70"/> 
    <img src="https://img.icons8.com/color/48/nginx.png" width="70"/> 
    <img src="https://img.icons8.com/?size=100&id=e6uRfPIDgoXi&format=png&color=000000" width="70"/> 
</p> 

<h1 align="center">Game List</h1>

<p align="center"> <a href="https://www.npmjs.com/package/docker">    
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"></a> <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a> <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a> <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a> <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a> 
</p>

<br />

## 🚀 Quick Access

[The app is currently hosted here]()

<br/>

## ⚙️ Installation Options

### Option 1: Run locally with [Docker](https://docs.docker.com/get-started/)

```bash

# Clone repository
git clone git@github.com:jessicasantosb/AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList.git
cd AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList

# Set up environment variables
echo "PORT=8888" > backend/.env
echo "JWT_SECRET=your_secret_key" >> backend/.env
echo "DATABASE_URL=postgresql://user:password@db:5432/gamelist" >> backend/.env
echo "FRONTEND_URL='http://localhost:5173'" >> backend/.env

echo "VITE_API_URL=/api" > frontend/.env

# Start containers
docker compose up -d --build

```

#### Notes

- Access on http://localhost
- To run the frontend locally without Docker, you can use Vite’s proxy to http://localhost:8888 on port 5173 (see vite.config.js).

---

### Option 2: Deploy on EC2 with [AWS account](https://aws.amazon.com/)

```bash

# On Ubuntu EC2 instance:

# Install Docker, add official GPG key and create the docker group and add your user

# Create a key pair and add to your Github

# Clone repository
git clone git@github.com:jessicasantosb/AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList.git
cd AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList

# Set up environment variables
echo "PORT=8888" > backend/.env
echo "JWT_SECRET=your_secret_key" >> backend/.env
echo "DATABASE_URL=postgresql://user:password@db:5432/gamelist" >> backend/.env
echo "FRONTEND_URL=http://$(you-public-IPv4-here)" >> backend/.env

echo "VITE_API_URL=/api" > frontend/.env

# Start containers
sudo docker compose up -d --build

```

#### Notes

- Access with your public DNS available on AWS console

<br/>

## 🔍 Key Features

- **Clean Codebase:** Maintainable and high-performance code
- **Containerized Architecture:** Docker containers for each service
- **Reverse Proxy:** Nginx for efficient routing and load handling

<br/>

## 📂 Project Structure

### Root

```
📂 game-list
┣ 📂 backend              # Backend API (Node.js + Express)
┣ 📂 frontend             # Frontend (React + Vite)
┣ 📂 nginx                # Nginx configuration
┣ 📄 docker-compose.yml   # Docker Compose configuration
┣ 📄 Dockerfile           # Root Dockerfile (orchestration)
┣ 📄 .gitignore           # Git ignore rules
┣ 📄 .dockerignore        # Docker ignore rules
┗ 📄 README.md            # Project documentation
```

### Frontend

```
📂 frontend
┣ 📂 src               # Application source code
┃ ┣ 📂 components      # Reusable UI components
┃ ┣ 📂 pages           # Application pages (routes)
┃ ┣ 📂 services        # API requests and business logic
┃ ┣ 📂 utils           # Helper functions and utilities
┃ ┗ 📄 main.tsx        # Application entry point
┣ 📄 .env  
 ┣ 📄 .env.example  
 ┣ 📄 .prettierrc  
 ┣ 📄 Dockerfile  
 ┣ 📄 eslint.config.js  
 ┣ 📄 package.json
```

### Backend

```
📂 backend
┣ 📂 src              # Backend source code
┃ ┣ 📂 controllers    # Request handlers
┃ ┣ 📂 models         # Database models
┃ ┣ 📂 routes         # API routes
┃ ┣ 📂 services       # Business logic
┃ ┗ 📄 index.ts       # Entry point
┣ 📄 package.json  
 ┣ 📄 .env.example  
 ┗ 📄 Dockerfile
```

<br/>

## 🛠 Tech Stack

**Backend:** Node.js, Express, TypeScript, JWT, Bcrypt and MongoDB + Mongoose  
**Frontend:** React, Vite, Axios, TypeScript, JWT-decode, Tanstack Query and Zod  
**Dev Tools:** ESLint and Prettier   
**Infrastructure:** Docker and Nginx  
