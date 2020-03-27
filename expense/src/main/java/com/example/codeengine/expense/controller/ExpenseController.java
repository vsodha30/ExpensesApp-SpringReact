package com.example.codeengine.expense.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.example.codeengine.expense.model.Expense;
import com.example.codeengine.expense.repository.ExpenseRepository;

//import com.example.codeengine.expense.model.Expense;

@RestController
@RequestMapping("/api")
public class ExpenseController {
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	@GetMapping("/expenses")
	List<Expense> getAllExpenses(){		
		return expenseRepository.findAll();
	} 	
	
	@GetMapping("/expenses/{id}")
	ResponseEntity<?> getSingleExpense(@PathVariable Long id){
		Optional<Expense> expense = expenseRepository.findById(id);
		return expense.map(exp -> ResponseEntity.ok().body(exp)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	// I need to add the functionality if ... the record already exists .. then dont let them create
	@PostMapping("/expenses")
	ResponseEntity<Expense> addExpenses(@Valid @RequestBody Expense expense) throws URISyntaxException{
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.created(new URI("/api/expenses"+result.getId())).body(result);
	}
	
	@DeleteMapping("/expenses/{id}")
	ResponseEntity<?> deleteExpense(@PathVariable Long id){
		expenseRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/expenses/{id}")
	ResponseEntity<Expense> updateExpense(@Valid @RequestBody Expense expense){
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.ok().body(result);
	}
	
	

}
