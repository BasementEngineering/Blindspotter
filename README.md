# Blindspotter

A full-stack application with Vue.js frontend and Bun/Hono backend, featuring functional programming patterns with Purify-TS.

## 🚀 Quick Start

### Prerequisites

- **Docker** (for containerized deployment)
- **Bun** v1.0+ (for development)
- **Node.js** v20+ (for frontend development tools)
- **pnpm** (for frontend package management)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blindspotter
   ```

2. **Install dependencies**
   ```bash
   # Root dependencies
   bun install

   # Backend dependencies
   cd backend && bun install && cd ..

   # Frontend dependencies
   cd frontend && pnpm install && cd ..
   ```

3. **Start development servers**
   ```bash
   # Start both frontend and backend in watch mode
   bun run dev
   ```

   This will start:
   - Backend server on `http://localhost:3000`
   - Frontend dev server on `http://localhost:5173`
   - Backend serves API routes at `/api/*`

## 🐳 Docker Deployment

### Build and Run

**macOS/Linux:**
```bash
# Build the Docker image
./bin/build.sh

# Run the container (default port 3000)
./bin/run.sh

# Run on custom port
./bin/run.sh 3001

# Stop the container
./bin/stop.sh
```

**Windows:**
```cmd
REM Build the Docker image
bin\build.bat

REM Run the container (default port 3000)
bin\run.bat

REM Run on custom port
bin\run.bat 3001

REM Stop the container
bin\stop.bat
```

### Manual Docker Commands

```bash
# Build
docker build -t blindspotter .

# Run
docker run -d --name blindspotter-app -p 3000:3000 blindspotter

# Stop
docker stop blindspotter-app && docker rm blindspotter-app
```

## 📁 Project Structure

```
Blindspotter/
├── backend/                    # Bun + Hono backend
│   ├── src/
│   │   ├── domain/            # Domain layer
│   │   │   ├── services/     # Business logic
│   │   │   └── types/        # Domain types
│   │   └── infra/            # Infrastructure layer
│   │       ├── routes/       # API routes
│   │       └── index.ts      # App configuration
│   └── main.ts               # Server entry point
├── frontend/                  # Vue.js + Vuetify frontend
├── bin/                      # Docker management scripts
├── docs/                     # Documentation
├── Dockerfile               # Multi-stage Docker build
└── package.json            # Root dependencies
```

## 🛠 Technology Stack

### Backend
- **Runtime:** Bun
- **Framework:** Hono
- **Functional Programming:** Purify-TS
- **Architecture:** Clean Architecture with functional DI

### Frontend
- **Framework:** Vue.js 3
- **UI Library:** Vuetify 3
- **Build Tool:** Vite
- **Package Manager:** pnpm

### Infrastructure
- **Containerization:** Docker
- **Development:** Hot reload for both frontend and backend

## 🔧 Development Scripts

### Root Level
```bash
bun run dev          # Start both frontend and backend in development mode
```

### Backend
```bash
cd backend
bun run main.ts      # Start backend server
bun --hot main.ts    # Start with hot reload
```

### Frontend
```bash
cd frontend
pnpm run dev         # Start development server
pnpm run build       # Build for production
pnpm run preview     # Preview production build
```

## 🌐 API Endpoints

- `GET /api/hello/` - Demo endpoint with Purify Either example
- `GET /api/hello/maybe?name=<name>` - Demo endpoint with Purify Maybe example
- `GET /` - Serves Vue.js frontend (in production/Docker)

## 🏗 Architecture

### Backend Architecture
- **Domain Layer:** Contains business logic and domain types
- **Infrastructure Layer:** Contains API routes and external service implementations
- **Purify-TS:** Provides functional programming patterns (Either, Maybe, etc.)

### Frontend Architecture
- **Vue 3:** Composition API with TypeScript
- **Vuetify 3:** Material Design components
- **Vue Router:** Client-side routing
- **Pinia:** State management

## 🔄 Docker Multi-stage Build

The Docker build process:
1. **Frontend Build Stage:** Uses Node.js to build Vue.js app with pnpm
2. **Backend Runtime Stage:** Uses Bun Alpine image for the server
3. **Static Files:** Frontend build output is served by backend at `/`
4. **API Routes:** Backend serves API at `/api/*` endpoints

## 📝 Environment Variables

Currently no environment variables are required. The application uses default configurations suitable for development and Docker deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally using `bun run dev`
5. Test Docker build using `./bin/build.sh && ./bin/run.sh`
6. Submit a pull request

## 📄 License

[Add your license information here]