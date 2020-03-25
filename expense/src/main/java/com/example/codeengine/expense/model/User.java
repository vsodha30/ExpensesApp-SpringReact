package com.example.codeengine.expense.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import lombok.Getter;
//import lombok.Setter;
// Jpa needs empty constructor .. .so instead of putting it manually or right clikcing and generating constructor
// we can directly add the annotation ,,, it will add it in the background ... 
//so that our code is not cluttered visually


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
// data generates lombok getter setter methods for all the fields nd other imp methods like hashcode, tostring
@Table(name="user")
public class User {
	
	@Id
//	@GeneratedValue
	private Long id;
	
//	@Getter @Setter
//	only for name property
	private String name;
	
	private String email;
	
//	@OneToMany
//	private Set<Category> category;

}
