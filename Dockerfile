FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port
EXPOSE 3000

# Use Next.js start instead of custom server
CMD ["npm", "run", "start"]
