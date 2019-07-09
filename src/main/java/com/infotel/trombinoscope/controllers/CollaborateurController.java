package com.infotel.trombinoscope.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.infotel.trombinoscope.entity.Collaborateur;
import com.infotel.trombinoscope.repository.CollaborateurRepository;

@RestController
@RequestMapping(path = "/collaborateur")
public class CollaborateurController {
	
    @Autowired
    private CollaborateurRepository repository;

    @GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Collaborateur> findAll() {
        return repository.findAll();
    }
    
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> create(
        @RequestPart String firstname,
        @RequestPart String lastname,
        @RequestPart String age,
        @RequestPart String job,
        @RequestPart String mission) {
        Collaborateur newCollab = new Collaborateur();
        newCollab.setFirstname(firstname);
        newCollab.setLastname(lastname);
        newCollab.setAge(Integer.parseInt(age));
        newCollab.setJob(null);
        newCollab.setMission(null);
        repository.save(newCollab);
        return ResponseEntity.ok("");
    }
    
    @PutMapping(value = "/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Collaborateur edit(@RequestBody Collaborateur collaborateur) {
        return repository.save(collaborateur);
    }

    @PostMapping(value = "/delete", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@RequestBody Collaborateur collaborateur) {
        repository.delete(collaborateur);
    }
}
