# FlixTube

FlixTube is a distributed, cloud-native video streaming application built from the ground up to explore microservices architecture. This project serves as a comprehensive playground for building, deploying, and scaling modern web applications using a variety of technologies and architectural patterns.

Inspired by the book [Bootstrapping Microservices](https://www.amazon.com/dp/1633438562), this project demonstrates a wholistic view of a microservices ecosystem, from frontend development to event-driven communication and cloud-native orchestration.

## 🚀 Architecture Overview

The system is composed of several specialized microservices organized in an **Nx monorepo**:

### Core Services
- **`gateway` (Next.js)**: The central web frontend and API gateway. It orchestrates requests to the underlying microservices to provide a unified user experience.
- **`video-upload` (NestJS)**: Manages video file uploads and initiates the storage process.
- **`video-streaming` (NestJS)**: Handles efficient video streaming by interfacing with the storage backend.
- **`metadata` (NestJS)**: Manages video metadata (titles, descriptions, URLs) stored in MongoDB.
- **`history` (NestJS)**: Tracks user viewing history through event-driven updates.
- **`azure-storage` (NestJS)**: A wrapper service for interacting with Azure Blob Storage.
- **`mock-storage` (NestJS)**: A local filesystem-based storage alternative used during development.
- **`db-fixture-rest-api` (NestJS)**: A utility service for seeding and managing database fixtures across the ecosystem.

### Shared Libraries
- **`rmq-broker`**: Standardized RabbitMQ messaging logic for event-driven communication.
- **`dynamic-db`**: Common MongoDB utilities and abstraction layers.
- **`mongodb-fixtures`**: Shared logic for managing test and development data.

### Communication Flow
1. **Synchronous**: Services communicate via REST APIs (orchestrated primarily by the `gateway`).
2. **Asynchronous**: Event-driven communication via **RabbitMQ** for decoupling (e.g., `VIDEO_UPLOADED` and `VIEWED` events).

---

## 🛠 Tech Stack

- **Frameworks**: [Next.js](https://nextjs.org/), [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Monorepo Management**: [Nx](https://nx.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Messaging**: [RabbitMQ](https://www.rabbitmq.com/)
- **Storage**: [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/)
- **DevOps**: Docker, Kubernetes, Terraform, GitHub Actions

---

## 🏃 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (v20+)
- [Nx CLI](https://nx.dev/getting-started/install)

### Development with Docker

The project includes a robust utility script for managing the Docker environment.

1.  **Load utility functions:**
    ```bash
    source dev_utility_functions.sh
    ```
2.  **Start all services in development mode:**
    ```bash
    up dev
    ```
    *This will spin up all microservices, MongoDB instances, and RabbitMQ using `docker-compose-all-dev.yml`.*

3.  **Shut down the environment:**
    ```bash
    down dev
    ```

### Deployment with Kubernetes

Kubernetes manifests are located in `infra/k8s`. Deployment scripts are provided in the `scripts/` directory.

1.  **Build images:**
    ```bash
    ./scripts/build_all_images.sh <platform> <env>
    ```
2.  **Deploy to cluster:**
    ```bash
    ./scripts/deploy.sh <deployment_env>
    ```

---

## 🔑 Environment Variables

To run the services successfully, the following environment variables need to be configured. You can find example values in the `*.env` files in the root directory.

### Common Variables
- `PORT`: The port number for the HTTP server (required for all microservices).
- `RABBIT`: The connection string for RabbitMQ (e.g., `amqp://guest:guest@localhost:5672`).
- `NODE_ENV`: The environment mode (`development` or `production`).

### `gateway` (Frontend)
- `NEXT_PUBLIC_HISTORY_HOST`: URL of the history microservice.
- `NEXT_PUBLIC_METADATA_HOST`: URL of the metadata microservice.
- `NEXT_PUBLIC_VIDEO_STREAMING_HOST`: URL of the video-streaming microservice.
- `NEXT_PUBLIC_VIDEO_UPLOAD_HOST`: URL of the video-upload microservice.

### `video-streaming`
- `DBHOST`: MongoDB connection string.
- `DBNAME`: Name of the streaming database.
- `VIDEO_STORAGE_HOST`: Hostname and port of the video storage service (Azure or Mock).

### `video-upload`
- `VIDEO_STORAGE_HOST`: Hostname and port of the video storage service.

### `metadata`
- `METADATA_DBHOST`: MongoDB connection string.
- `METADATA_DBNAME`: Name of the metadata database.

### `history`
- `HISTORY_DBHOST`: MongoDB connection string.
- `HISTORY_DBNAME`: Name of the history database.

### `azure-storage`
- `STORAGE_ACCOUNT_NAME`: Your Azure Storage account name.
- `STORAGE_ACCESS_KEY`: Your Azure Storage access key.
- `STORAGE_CONTAINER_NAME`: The name of the blob container (defaults to `videos`).

### `mock-storage`
- `ABSOLUTE_PROJECT_PATH`: The absolute path to the project root on your local machine (used for mapping file paths).

### `db-fixture-rest-api`
- `DB_FIXTURES_HOST`: MongoDB connection string.
- `FIXTURES_DIR`: Directory where database fixtures are stored.

---

## 📸 Screenshots

Here is FlixTube running locally, demonstrating the core features from video listing to playback and history tracking.

### 1. Video Upload
![Video Upload](./flixtube_screenshots/Screenshot%202026-02-28%20at%2014.17.46%20(2).png)

### 2. Video Selection
![Video Selection](./flixtube_screenshots/Screenshot%202026-02-28%20at%2014.18.45%20(2).png)

### 3. Video List
![Video List](./flixtube_screenshots/Screenshot%202026-02-28%20at%2014.19.37%20(2).png)

### 4. Video Playback
![Video Playback](./flixtube_screenshots/Screenshot%202026-02-28%20at%2014.20.16%20(2).png)

### 5. Video History
![Video History](./flixtube_screenshots/Screenshot%202026-02-28%20at%2014.24.07%20(2).png)

---

## 🗺 Roadmap

The project is continuously evolving. Key areas for future development include:

- [ ] **Observability**: Implement ELK stack, Prometheus, Grafana, and OpenTelemetry.
- [ ] **Auth**: Add Authentication & Authorization (RBAC).
- [ ] **SQL Integration**: Introduce Postgres with Drizzle ORM.
- [ ] **Security**: Static Analysis Security Testing (SAST) with Sonarqube.
- [ ] **Scaling**: Implement elastic scaling for microservices and K8s clusters.
- [ ] **Messaging**: Evaluate replacing RabbitMQ with Kafka.
- [ ] **Mobile**: Develop a mobile gateway and GraphQL support.
- [ ] **Performance**: Integrate Redis for caching.

---

## 📖 Learning Journey

This project was built to gain hands-on experience with:
- Designing microservice boundaries.
- Implementing event-driven architectures.
- Managing a monorepo with Nx.
- Orchestrating deployments with Kubernetes and Terraform.
- Handling cloud-native storage and streaming.

Built by [James Njuguna](https://github.com/JayKay24).
