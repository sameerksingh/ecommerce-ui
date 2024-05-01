# Use the official lightweight Node.js 14 image
FROM node:14-slim

# Set the working directory in the container
WORKDIR /ecommerce-ui

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# Build the Vue.js app
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the Vue.js application
CMD ["npm", "run", "serve"]
