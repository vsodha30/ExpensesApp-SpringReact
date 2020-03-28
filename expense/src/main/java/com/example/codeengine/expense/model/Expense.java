package com.example.codeengine.expense.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="expense")
public class Expense {
	
	@Id @GeneratedValue
	private Long id;
	
	private Instant expensedate;
	// here i think the column order doesnt matter ... as it is different from here in data.sql
	
	private String descript;
	
	private String location;
	
	@ManyToOne
	private Category category;
	
	@JsonIgnore
	@ManyToOne
	private User user;

}
