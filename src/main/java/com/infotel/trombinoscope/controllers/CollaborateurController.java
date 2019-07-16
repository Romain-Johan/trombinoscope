package com.infotel.trombinoscope.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import com.infotel.trombinoscope.entity.Client;
import com.infotel.trombinoscope.entity.Collaborateur;
import com.infotel.trombinoscope.entity.Poste;
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
    
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Collaborateur create(@RequestBody Collaborateur c) {
        return repository.save(c);
    }
    
    @PutMapping(value = "/edit/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Collaborateur edit(@PathVariable("id") String id, @RequestBody Collaborateur c) {
        Optional<Collaborateur> coll = repository.findById(id);
        Collaborateur collab = new Collaborateur();
        if(coll.isPresent()) {
            collab = coll.get();
            collab = c;
        }
        return repository.save(collab);
    }

    @PutMapping(value = "/edit2", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> edit2(
        @RequestPart String id,
        @RequestPart String firstname,
        @RequestPart String lastname,
        @RequestPart String age,
        @RequestPart String job,
        @RequestPart String mission) {
        Optional<Collaborateur> c = repository.findById(id);
        if(c.isPresent()) {
            Collaborateur collab = c.get();
            collab.setFirstname(firstname);
            collab.setLastname(lastname);
            collab.setAge(Integer.parseInt(age));
            Poste poste = new Poste();
            poste.setLibelle(job);
            collab.setJob(poste);
            Client client = new Client();
            client.setLibelle(mission);
            collab.setMission(client);
            repository.save(collab);
            return ResponseEntity.ok("");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/delete", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@RequestBody Collaborateur collaborateur) {
        repository.delete(collaborateur);
    }
}
