#!/bin/bash

# Set Java environment
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"

# Run Spring Boot application
./mvnw spring-boot:run 