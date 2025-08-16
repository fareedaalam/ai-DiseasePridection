# Create root folder
mkdir opd-app
cd opd-app

# Create frontend folder
mkdir frontend
cd frontend
npm create vite@latest .  # Choose React and JavaScript
npm install
cd ..

# Create backend folder
mkdir backend
cd backend
npm init -y
npm install express cors sqlite3
cd ..

# Create Dockerfile at root
touch Dockerfile

# Create docker-compose.yml at root
touch docker-compose.yml

# Create backend files
touch backend/server.js backend/db.js
##=======
How to Build & Run with Docker Compose
# From root opd-app/
docker-compose build
docker-compose up

##===
rm -rf node_modules package-lock.json
npm install
npm run dev