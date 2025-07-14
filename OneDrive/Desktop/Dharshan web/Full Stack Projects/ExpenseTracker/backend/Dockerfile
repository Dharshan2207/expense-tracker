FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw && ./mvnw -B -DskipTests clean package

CMD ["java", "-jar", "target/ExpenseTracker-0.0.1-SNAPSHOT.jar"]
