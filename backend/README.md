# POS Backend - Spring Boot Application

This is a Spring Boot application for the POS Training App backend.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Setup Java Environment

Since you're on macOS with Homebrew, make sure Java is properly configured:

```bash
# Set Java environment variables
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"

# Verify Java installation
java -version
```

## Running the Application

### Option 1: Using the provided script (Recommended)
```bash
cd backend
./run.sh
```

### Option 2: Using Maven Wrapper with environment setup
```bash
cd backend
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
./mvnw spring-boot:run
```

### Option 3: Using Maven (if installed globally)
```bash
cd backend
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
mvn spring-boot:run
```

### Option 4: Build and Run JAR
```bash
cd backend
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
./mvnw clean package
java -jar target/pos-backend-0.0.1-SNAPSHOT.jar
```

## Accessing the Application

Once the application is running, you can access:

- **Main Application**: http://localhost:8080
- **API Endpoints**: 
  - http://localhost:8080/api/hello
  - http://localhost:8080/api/health
- **H2 Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/example/posbackend/
│   │       ├── PosBackendApplication.java (Main class)
│   │       └── controller/
│   │           └── HelloController.java (REST endpoints)
│   └── resources/
│       └── application.properties (Configuration)
└── test/
    └── java/ (Test files)
```

## Dependencies

- **Spring Boot Starter Web**: REST API support
- **Spring Boot Starter Data JPA**: Database operations
- **Spring Boot Starter Validation**: Input validation
- **H2 Database**: In-memory database for development
- **Spring Boot Starter Test**: Testing support

## Development

The application uses:
- **Port**: 8080
- **Database**: H2 in-memory database
- **JPA**: Hibernate with auto table creation
- **Logging**: Debug level for development

## Troubleshooting

If you encounter "Unable to locate a Java Runtime" error:
1. Make sure Java 17 is installed: `brew install openjdk@17`
2. Set the environment variables as shown above
3. Verify Java is accessible: `java -version` 