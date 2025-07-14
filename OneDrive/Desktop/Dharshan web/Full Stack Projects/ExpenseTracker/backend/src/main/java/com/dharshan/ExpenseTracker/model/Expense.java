package com.dharshan.ExpenseTracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expense")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String description;
    private String category;
    private LocalDate date;

    private String username; // For multi-user support

    // Default constructor (required by JPA)
    public Expense() {}

    // All-args constructor (helpful for testing/seeding)
    public Expense(Double amount, String description, String category, LocalDate date, String username) {
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.date = date;
        this.username = username;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
