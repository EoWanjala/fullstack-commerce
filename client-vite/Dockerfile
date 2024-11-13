# # Step 1: Build the application
# FROM node:18 AS build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install --legacy-peer-deps

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build


# # Copy the built application from the previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 5173

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]




ARG NODE_VERSION=16.14-alpine

FROM node:14 as node

FROM node as client-local-build

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY ./package*.json .
RUN npm config set registry http://registry.npmjs.org/
RUN npm install


# Expose the port the app runs on
EXPOSE 5173

COPY . ${APP_HOME}

# Run the development server
CMD ["npm", "run", "dev"]
