# Use an official Node runtime as a parent image
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build --prod

# Use a smaller image for the production container
FROM nginx:1.21-alpine

# Copy the built application to the nginx directory
COPY --from=build /app/dist/insighttellers-web/ /usr/share/nginx/html

# Expose the default port for HTTP traffic
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

