# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY archigator/package*.json ./

# Install the Angular CLI
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY archigator .

# Build the Angular app
RUN ng build --configuration=production

# Use the Nginx image as the base for the final image
FROM nginx:latest

# Copy the Nginx configuration file to the container
COPY archigator/default.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app to Nginx's default public directory
COPY --from=build /app/dist/archigator /usr/share/nginx/html

COPY /images /usr/share/nginx/images/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
