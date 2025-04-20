### Core Depencendies
- **express**: Web framework for building the API
- **dotenv**: For manageing environment variables
- **cors**: For handling Cross-Origin Resource Sharing
- **helmet**: For adding security headers

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

### Adding New Dependencies
To add a new dependency:
- For production: `npm install package`
- For development: `npm install -D package`

### Updating Dependencies
To update dependencies:
- Check for outdated packages: `npm outdated`
- Update a specific package: `npm update package`
- Update all packages: `npm update`