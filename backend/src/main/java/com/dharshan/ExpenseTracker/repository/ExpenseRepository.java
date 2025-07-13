package com.dharshan.ExpenseTracker.repository;

import com.dharshan.ExpenseTracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    // nothing extra for now
}
