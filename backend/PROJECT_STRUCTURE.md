# Spring Boot Project Structure for CRUD Operations

This document explains the recommended directory structure and architecture for a Spring Boot application with CRUD operations.

## 📁 Directory Structure

```
src/main/java/com/example/posbackend/
├── PosBackendApplication.java          # Main application class
├── config/                             # Configuration classes
│   └── CorsConfig.java                # CORS configuration
├── controller/                         # REST API controllers
│   ├── HelloController.java           # Simple test controller
│   └── ProductController.java         # Product CRUD operations
├── dto/                               # Data Transfer Objects
│   └── ProductDto.java                # Product DTO for API layer
├── exception/                         # Custom exceptions
│   ├── ProductNotFoundException.java  # Product not found exception
│   ├── DuplicateProductException.java # Duplicate product exception
│   └── GlobalExceptionHandler.java    # Global exception handler
├── model/                             # Entity classes (JPA models)
│   └── Product.java                   # Product entity
├── repository/                        # Data access layer
│   └── ProductRepository.java         # Product repository interface
└── service/                           # Business logic layer
    └── ProductService.java            # Product business logic
```

## 🏗️ Architecture Layers

### 1. **Controller Layer** (`controller/`)
- **Purpose**: Handle HTTP requests and responses
- **Responsibilities**:
  - Validate incoming requests
  - Convert between DTOs and entities
  - Call appropriate service methods
  - Return HTTP responses
- **Example**: `ProductController.java`

### 2. **DTO Layer** (`dto/`)
- **Purpose**: Data Transfer Objects for API communication
- **Responsibilities**:
  - Define API request/response structure
  - Include validation annotations
  - Separate API layer from domain model
- **Example**: `ProductDto.java`

### 3. **Service Layer** (`service/`)
- **Purpose**: Business logic and transaction management
- **Responsibilities**:
  - Implement business rules
  - Handle transactions
  - Call repository methods
  - Throw custom exceptions
- **Example**: `ProductService.java`

### 4. **Repository Layer** (`repository/`)
- **Purpose**: Data access and persistence
- **Responsibilities**:
  - Define database operations
  - Use Spring Data JPA
  - Create custom queries
- **Example**: `ProductRepository.java`

### 5. **Model Layer** (`model/`)
- **Purpose**: JPA entities representing database tables
- **Responsibilities**:
  - Define database schema
  - Include JPA annotations
  - Define relationships
- **Example**: `Product.java`

### 6. **Exception Layer** (`exception/`)
- **Purpose**: Custom exceptions and error handling
- **Responsibilities**:
  - Define custom exceptions
  - Handle exceptions globally
  - Provide consistent error responses
- **Examples**: `ProductNotFoundException.java`, `GlobalExceptionHandler.java`

### 7. **Configuration Layer** (`config/`)
- **Purpose**: Application configuration
- **Responsibilities**:
  - CORS configuration
  - Security settings
  - Bean configurations
- **Example**: `CorsConfig.java`

## 🔄 Data Flow

```
HTTP Request → Controller → DTO → Service → Repository → Database
                ↓
HTTP Response ← Controller ← DTO ← Service ← Repository ← Database
```

## 📋 CRUD Operations Example

### Create (POST)
```http
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stockQuantity": 10
}
```

### Read (GET)
```http
GET /api/products          # Get all products
GET /api/products/1        # Get product by ID
GET /api/products/search?name=laptop  # Search by name
GET /api/products/available # Get available products
```

### Update (PUT)
```http
PUT /api/products/1
Content-Type: application/json

{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 899.99,
  "stockQuantity": 15
}
```

### Delete (DELETE)
```http
DELETE /api/products/1
```

## 🛠️ Best Practices

### 1. **Separation of Concerns**
- Each layer has a specific responsibility
- Controllers handle HTTP, services handle business logic
- Repositories handle data access

### 2. **DTO Pattern**
- Use DTOs for API communication
- Keep entities separate from API layer
- Include validation in DTOs

### 3. **Exception Handling**
- Use custom exceptions for specific error cases
- Handle exceptions globally
- Provide consistent error responses

### 4. **Validation**
- Use Bean Validation annotations
- Validate at DTO level
- Provide meaningful error messages

### 5. **Transaction Management**
- Use `@Transactional` in service layer
- Mark read-only operations appropriately
- Handle rollbacks properly

### 6. **Repository Methods**
- Use Spring Data JPA naming conventions
- Create custom queries when needed
- Use `@Query` for complex queries

## 🚀 Adding New Entities

To add a new entity (e.g., `Customer`):

1. **Create Model**: `model/Customer.java`
2. **Create DTO**: `dto/CustomerDto.java`
3. **Create Repository**: `repository/CustomerRepository.java`
4. **Create Service**: `service/CustomerService.java`
5. **Create Controller**: `controller/CustomerController.java`
6. **Add Exceptions**: `exception/CustomerNotFoundException.java`
7. **Update Exception Handler**: Add handlers in `GlobalExceptionHandler.java`

## 📊 Database Schema

The application uses H2 in-memory database for development:

```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## 🔧 Configuration

Key configuration in `application.properties`:
- Database connection
- JPA settings
- Logging levels
- Server port

This structure provides a scalable, maintainable foundation for building robust CRUD applications with Spring Boot. 