# Use Node.js as the base image
FROM node:latest AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the entire project directory into the container
COPY . .

# Build the Angular app
RUN yarn build

# Use a lightweight image for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the NGINX web root directory
COPY --from=builder /app/dist/getluck-app /usr/share/nginx/html

# Expose the port that NGINX is listening on
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]