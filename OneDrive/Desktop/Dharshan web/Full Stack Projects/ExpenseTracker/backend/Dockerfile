# Use correct Java version
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Run Maven build
RUN ./mvnw -B -DskipTests clean package

# Run the app
CMD ["java", "-jar", "target/*.jar"]
