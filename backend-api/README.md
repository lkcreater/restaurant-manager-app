# Restaurant Manager API

A comprehensive NestJS backend API with TypeORM (PostgreSQL), Zod validation, Winston logging, and file upload capabilities.

## Features

- ✅ **TypeORM with PostgreSQL** - Database ORM with PostgreSQL support
- ✅ **Zod Validation** - Schema validation for request data
- ✅ **Winston Logger** - Advanced logging with file and console transports
- ✅ **Cookie Parser** - Cookie parsing middleware
- ✅ **CORS** - Cross-Origin Resource Sharing support
- ✅ **Swagger Documentation** - Interactive API documentation
- ✅ **API Versioning** - URI-based versioning (v1)
- ✅ **Health Checks** - Application and database health endpoints
- ✅ **File Uploads** - Multer-based file upload with validation
- ✅ **Cross-env** - Cross-platform environment variable support

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=restaurant_manager
```

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE restaurant_manager;
```

2. The application will automatically create tables on first run (synchronize is enabled in development mode).

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## API Documentation

Once the application is running, access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

## API Endpoints

### Health Checks
- `GET /api/v1/health` - Basic health check
- `GET /api/v1/health/db` - Database health check

### File Uploads
- `POST /api/v1/uploads` - Upload a single file
- `POST /api/v1/uploads/multiple` - Upload multiple files (max 10)

## Project Structure

```
backend-api/
├── src/
│   ├── common/
│   │   └── pipes/
│   │       └── zod-validation.pipe.ts    # Zod validation pipe
│   ├── config/
│   │   ├── database.config.ts            # TypeORM configuration
│   │   └── logger.config.ts              # Winston logger configuration
│   ├── health/
│   │   ├── health.controller.ts          # Health check endpoints
│   │   └── health.module.ts              # Health check module
│   ├── uploads/
│   │   ├── dto/
│   │   │   └── upload.dto.ts             # Upload DTOs and schemas
│   │   ├── uploads.controller.ts         # Upload endpoints
│   │   ├── uploads.service.ts            # Upload business logic
│   │   └── uploads.module.ts             # Uploads module
│   ├── app.controller.ts                 # Root controller
│   ├── app.module.ts                     # Root module
│   ├── app.service.ts                    # Root service
│   └── main.ts                           # Application entry point
├── uploads/                              # Uploaded files directory
├── logs/                                 # Application logs
├── .env                                  # Environment variables
├── .env.example                          # Environment variables template
└── package.json                          # Dependencies and scripts
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Application port | `3000` |
| `API_PREFIX` | Global API prefix | `api` |
| `API_VERSION` | API version | `v1` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `DB_DATABASE` | Database name | `restaurant_manager` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000,http://localhost:5173` |
| `UPLOAD_DESTINATION` | Upload directory | `./uploads` |
| `MAX_FILE_SIZE` | Max file size in bytes | `5242880` (5MB) |

## File Upload Configuration

- **Max file size**: 5MB per file
- **Multiple upload limit**: 10 files
- **Storage**: Local disk storage in `./uploads` directory
- **Filename**: Random 32-character hex string + original extension

## Logging

Logs are written to:
- **Console**: Colored, formatted output
- **logs/error.log**: Error level logs only
- **logs/combined.log**: All logs

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the application |
| `npm run start` | Start in production mode |
| `npm run start:dev` | Start in development mode with watch |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start production build |
| `npm run lint` | Lint and fix code |
| `npm run format` | Format code with Prettier |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage |

## Technologies

- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript and JavaScript
- **PostgreSQL** - Relational database
- **Zod** - TypeScript-first schema validation
- **Winston** - Logging library
- **Swagger** - API documentation
- **Multer** - File upload middleware
- **Cookie Parser** - Cookie parsing middleware

## License

UNLICENSED
