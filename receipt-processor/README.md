# Receipt Processor API

This API processes receipt data and calculates points according to specified rules.

## Running the Application

### Option 1: Local Development

If you have Node.js installed (v18+ recommended), you can run the application directly:

```bash
# Install dependencies
npm install

# Start the server in development mode with auto-reload
npm run dev

# Or to build and run in production mode
npm run build
npm start
```

The API will be available at http://localhost:3000

### Option 2: Docker Development Environment (Recommended)

This option allows you to run the application in a consistent environment without installing Node.js locally:

```bash
# Build and start the development container
docker-compose up --build
```

The container:
- Runs in development mode with auto-reload
- Mounts the source directory so your code changes are reflected immediately
- Exposes the API at http://localhost:3000

## API Endpoints

- `POST /receipts/process`: Submit a receipt for processing
- `GET /receipts/{id}/points`: Get points for a processed receipt

## Testing

Run the test suite:

```bash
npm test
```

### Core Dependencies
- **express**: Web framework for building the API
- **dotenv**: For manageing environment variables
- **cors**: For handling Cross-Origin Resource Sharing
- **helmet**: For adding security headers
- **express-validator**: For input validation
- **winston**: For logging

### Development Dependencies
- **typescript**: For type safety and modern Javascript features
- **ts-node**: For running Typescript files directly
- **nodemone**: For auto-restarting the server during development
- **jest**: For testing
- **eslint**: For code linting
- **prettier**: For code formatting

### NPM Scripts
-- `npm start`: Runs the compiled JS in production
-- `npm run dev`: Runs the TS code directly during development with auto-reload
-- `npm run build`: Compiles TS to JS
-- `npm test`: Runs tests
-- `npm run test:watch`: Runs Jest tests in watch mode
-- `npm run lint`: Checks code for style and potential errors
-- `npm run lint:fix`: Automatically fixes linting issues where possible
-- `npm run format`: Formats code using prettier
-- `npm run format:check`: Checks if files are properly formatted

### Docker Support
This application can be run as a Docker container. We provide both a Dockerfile and docker-compose.yml for easy deployment.

#### Running with Docker Compose
To build and run the application with Docker Compose:

```bash
# Build and start the container
docker-compose up --build

# To run in detached mode
docker-compose up -d --build
```

#### Running with Docker Directly
To build and run using Docker commands:

```bash
# Build the Docker image
docker build -t receipt-processor .

# Run the container
docker run -p 3000:3000 receipt-processor
```

#### Docker Environment Variables
You can configure the application by setting environment variables in docker-compose.yml:
- PORT: The port the application will listen on (default: 3000)
- NODE_ENV: The environment mode (default: production)
- LOG_LEVEL: The logging level (default: info)

### Adding New Dependencies
To add a new dependency:
- For production: `npm install package`
- For development: `npm install -D package`

### Updating Dependencies
To update dependencies:
- Check for outdated packages: `npm outdated`
- Update a specific package: `npm update package`
- Update all packages: `npm update`