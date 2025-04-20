FROM node:18-alpine

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Create logs directory 
RUN mkdir -p logs

# Expose the port the app runs on
EXPOSE 3000

# Set NODE_ENV to development
ENV NODE_ENV=development

# Start the app in development mode with auto-reload
CMD ["npm", "run", "dev"] 