package com.infotel.trombinoscope.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.infotel.trombinoscope.entity.Poste;
import com.infotel.trombinoscope.repository.PosteRepository;

@RestController
@RequestMapping(path = "/poste")
public class PosteController {
	
    @Autowired
    private PosteRepository repository;

    @GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Poste> findAll() {
        return repository.findAll();
    }
    
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> create(
        @RequestPart String libelle) {
        Poste newPoste = new Poste();
        newPoste.setLibelle(libelle);
        repository.save(newPoste);
        return ResponseEntity.ok("");
    }
}