# FlixTube

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![GitHub stars](https://img.shields.io/github/stars/JayKay24/flix-tube?style=flat-square)](https://github.com/JayKay24/flix-tube/stargazers)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Nx](https://img.shields.io/badge/nx-143055?style=flat-square&logo=nx&logoColor=white)](https://nx.dev/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat-square&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=flat-square&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=flat-square&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=flat-square&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/)

FlixTube is a distributed, cloud-native video streaming application I built from the ground up to explore microservices architecture. I designed this project as a comprehensive playground for building, deploying, and scaling modern web applications using a variety of technologies and architectural patterns.

Inspired by the book [Bootstrapping Microservices](https://www.amazon.com/dp/1633438562), I built this to demonstrate a wholistic view of a microservices ecosystem — from frontend development to event-driven communication and cloud-native orchestration.

## 🚀 Architecture Overview

I organized the system as several specialized microservices in an **Nx monorepo**:

### Core Services
- **`gateway` (Next.js)**: The central web frontend and API gateway I built to orchestrate requests to the underlying microservices and provide a unified user experience.
- **`video-upload` (NestJS)**: Manages video file uploads and initiates the storage process.
- **`video-streaming` (NestJS)**: Handles efficient video streaming by interfacing with the storage backend.
- **`metadata` (NestJS)**: Manages video metadata (titles, descriptions, URLs) stored in MongoDB.
- **`history` (NestJS)**: Tracks user viewing history through event-driven updates.
- **`azure-storage` (NestJS)**: A wrapper service I wrote for interacting with Azure Blob Storage.
- **`mock-storage` (NestJS)**: A local filesystem-based storage alternative I use during development.
- **`db-fixture-rest-api` (NestJS)**: A utility service I built for seeding and managing database fixtures across the ecosystem.

### Shared Libraries
- **`rmq-broker`**: Standardized RabbitMQ messaging logic I wrote for event-driven communication.
- **`dynamic-db`**: Common MongoDB utilities and abstraction layers I extracted for reuse.
- **`mongodb-fixtures`**: Shared logic I built for managing test and development data.

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

I included a robust utility script for managing the Docker environment.

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

I keep Kubernetes manifests in `infra/k8s` and deployment scripts in the `scripts/` directory.

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

To run the services successfully, the following environment variables need to be configured. I've included example values in the `*.env` files in the root directory.

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

Here is FlixTube running locally, demonstrating the core features I built — from video listing to playback and history tracking.

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

I'm continuously evolving this project. Key areas I plan to tackle next:

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

I built this project to gain hands-on experience with:
- Designing microservice boundaries.
- Implementing event-driven architectures.
- Managing a monorepo with Nx.
- Orchestrating deployments with Kubernetes and Terraform.
- Handling cloud-native storage and streaming.

— [James Njuguna](https://github.com/JayKay24)
