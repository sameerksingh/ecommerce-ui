# Use the official lightweight Node.js 14 image
FROM node:22-slim

# Set the working directory in the container
WORKDIR /ecommerce-ui

# Copy package.json and package-lock.json to the working directory
COPY package*.json /ecommerce-ui/

# Install dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . /ecommerce-ui/

# Build the Vue.js app
RUN yarn build

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the Vue.js application
CMD ["yarn", "serve"]
