# Stage 1: Build the Angular app
FROM node:20-alpine as build-stage

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project for production
RUN npm run build -- --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents
# Note: Check your angular.json for the exact output path (usually dist/project-name/browser)
COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html

# Copy a custom nginx config if you have one (recommended for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]