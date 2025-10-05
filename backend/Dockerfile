# Use Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the backend server
CMD ["node", "metricsServer.js"]
