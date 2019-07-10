package com.infotel.trombinoscope.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.infotel.trombinoscope.entity.Client;
import com.infotel.trombinoscope.repository.ClientRepository;

@RestController
@RequestMapping(path = "/client")
public class ClientController {
	
    @Autowired
    private ClientRepository repository;

    @GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Client> findAll() {
        return repository.findAll();
    }
    
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> create(
        @RequestPart String libelle) {
        Client newClient = new Client();
        newClient.setLibelle(libelle);
        repository.save(newClient);
        return ResponseEntity.ok("");
    }
}