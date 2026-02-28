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
