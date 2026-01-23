# Product Management System - Homelab Edition

A full-stack CRUD application for managing products, designed for homelab environments. This project provides a simple yet functional interface for managing product data with a backend API and a frontend UI.

## Features

- **Backend API**: FastAPI-based RESTful API for product management
- **Frontend UI**: Angular-based user interface for interacting with the API
- **Database**: PostgreSQL for data persistence
- **Containerization**: Docker and Docker Compose for easy deployment
- **CI/CD**: GitHub Actions workflow for automated deployment

## Technologies

### Backend
- **FastAPI**: Modern, fast (high-performance) web framework for building APIs
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM) library
- **Psycopg2**: PostgreSQL database adapter for Python
- **Python-dotenv**: For loading environment variables from `.env` files

### Frontend
- **Angular**: Platform for building mobile and desktop web applications
- **Bootstrap**: CSS framework for responsive design
- **RxJS**: Reactive extensions for asynchronous programming

### DevOps
- **Docker**: Containerization platform for packaging and deploying applications
- **Docker Compose**: Tool for defining and running multi-container Docker applications
- **GitHub Actions**: CI/CD platform for automating workflows

## Architecture

The application follows a client-server architecture:

1. **Frontend**: Angular application running on port 4200
2. **Backend**: FastAPI server running on port 8000
3. **Database**: PostgreSQL database (configured via environment variables)

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js (for frontend development)
- Python 3.8+ (for backend development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/product-management-system.git
cd product-management-system
```

2. Set up environment variables:

Create a `.env` file in the `backend` directory with the following content:

```env
DATABASE_URL=postgresql://user:password@db:5432/productdb
```

3. Build and start the containers:

```bash
docker-compose up --build
```

### Development

#### Backend

To run the backend locally:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

To run the frontend locally:

```bash
cd frontend
npm install
ng serve
```

## API Endpoints

The backend provides the following RESTful endpoints:

- `GET /api/products`: Retrieve all products
- `GET /api/products/{id}`: Retrieve a specific product by ID
- `POST /api/products`: Create a new product
- `PUT /api/products/{id}`: Update an existing product
- `DELETE /api/products/{id}`: Delete a product

## Deployment

The application is configured for deployment using Docker and Docker Compose. The `docker-compose.yml` file defines the services for the backend, frontend, and database.

### Deployment Steps

1. Build the Docker images:

```bash
docker-compose build
```

2. Start the services:

```bash
docker-compose up -d
```

3. Access the application:

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8000`

## CI/CD

The project includes a GitHub Actions workflow for automated deployment. The workflow is defined in `.github/workflows/deploy.yml` and can be customized to fit your deployment needs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Support

For support, please open an issue on the GitHub repository.

---

This README provides a comprehensive overview of the Product Management System, including its features, technologies, architecture, and deployment instructions. It is tailored for homelab environments and includes all necessary information to get started with the project.