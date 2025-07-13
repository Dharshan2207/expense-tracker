# Start from a base Java image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Maven build files
COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the source code
COPY src ./src

# Package the application
RUN ./mvnw package -DskipTests

# Expose port 8080
EXPOSE 8080

# Start the Spring Boot app
CMD ["java", "-jar", "target/*.jar"]
