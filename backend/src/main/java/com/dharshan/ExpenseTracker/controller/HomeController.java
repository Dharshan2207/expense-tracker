
package com.dharshan.ExpenseTracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/backend")
    public String backendHome() {
        return "Welcome to the Expense Tracker Backend! 🚀";
    }

    @GetMapping("/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }
}
