package com.infotel.trombinoscope.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.infotel.trombinoscope.entity.Competence;
import com.infotel.trombinoscope.repository.CompetenceRepository;

@RestController
@RequestMapping(path = "/competence")
public class CompetenceController {
	
    @Autowired
    private CompetenceRepository repository;

    @GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Competence> findAll() {
        return repository.findAll();
    }
    
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Competence create(@RequestBody Competence c) {
        return repository.save(c);
    }
}