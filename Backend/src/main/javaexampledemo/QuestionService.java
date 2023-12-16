package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

	@Autowired
	QuestionDao questionDao;
	
	public ResponseEntity<List<Question>>  getAllQuestion() {
		
		return new ResponseEntity<>(questionDao.findAll(), HttpStatus.OK);
		
	}
	
	public ResponseEntity<String> addQuestion(Question question){
		questionDao.save(question);
		
		return new ResponseEntity<>("Success",HttpStatus.CREATED);
	}
}
