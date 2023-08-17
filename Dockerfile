# Use the official Node.js LTS image
FROM node:20-alpine3.17

# Set the working directory
WORKDIR "C:\Apps\MyNodeApp"

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
