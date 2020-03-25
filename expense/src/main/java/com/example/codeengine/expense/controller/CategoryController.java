package com.example.codeengine.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.codeengine.expense.model.Category;
import com.example.codeengine.expense.repository.CategoryRepository;

@RestController
@RequestMapping("/api")
public class CategoryController {
	
	private CategoryRepository categoryRepository;
	
	public CategoryController(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
	
	@GetMapping("/categories")
//	private Category cat
	Collection<Category> categ(){
		return this.categoryRepository.findAll();
	}
	
	@GetMapping("/categories/{id}")
	ResponseEntity<?> getallcateg(@PathVariable Long id){
		Optional<Category> categ =  categoryRepository.findById(id);
//		return ResponseEntity.ok().body(categ);
		return categ.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/category")
	ResponseEntity<Category> addCateg(@Valid @RequestBody Category category) throws URISyntaxException{
		Category result = categoryRepository.save(category);
		return ResponseEntity.created(new URI("/api/category/"+result.getId())).body(result);
	}
	
	@PutMapping("/category/{id}")
	ResponseEntity<Category> updateCateg(@Valid @RequestBody Category category){
		Category result = categoryRepository.save(category);
		return ResponseEntity.ok().body(result);		
	}
	
	@DeleteMapping("/category/{id}")
	ResponseEntity<?> deletecateg(@PathVariable Long id){
		categoryRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	
}
