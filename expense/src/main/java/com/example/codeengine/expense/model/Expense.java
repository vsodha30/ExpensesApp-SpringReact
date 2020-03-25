package com.example.codeengine.expense.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="expense")
public class Expense {
	
	@Id
	private Long id;
	
	private Instant expensedate;
	// here i think the column order doesnt matter ... as it is different from here in data.sql
	
	private String descript;
	
	@ManyToOne
	private Category category;
	
	@ManyToOne
	private User user;

}
