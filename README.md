<p align="center">
  <img src="https://img.icons8.com/color/48/docker.png" width="70"/>
  <img src="https://img.icons8.com/color/48/nginx.png" width="70"/>
  <img src="https://img.icons8.com/?size=100&id=e6uRfPIDgoXi&format=png&color=000000" width="70"/>
</p>

<h1 align="center">Desafio 3 - Game List</h1>

## 🚀 Quick Access

[The app is currently hosted here](http://ec2-3-132-237-48.us-east-2.compute.amazonaws.com/)

## ⚙️ Installation Options

### Option 1: Run locally with [Docker](https://docs.docker.com/get-started/)

```bash

# Clone repository
git clone git@github.com:jessicasantosb/AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList.git
cd AWS_FS_ABR25_D03_COMPASS_Desafio3_GameList

# Navigate to project
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

### Option 2: Run using [AWS account](https://aws.amazon.com/) EC2

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

## 🔗 Related Projects

- Previous challenge (without using Docker and NGINX): **[DESAFIO 2](https://github.com/Giron-jpg/AWS_FS_ABR25_D02_COMPASS_Game_List)**

## 🔍 Key Features
- **Containerized Architecture:** Docker containers for each service
- **Reverse Proxy:** Nginx for efficient routing

## 💻 Technologies Used

- **Docker**
- **Nginx**
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
