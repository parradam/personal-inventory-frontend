# Use the official Node.js image as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY frontend .

# Build the Vite project
RUN npm run build

# Install a web server to serve the production build
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5173

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "5173"]
