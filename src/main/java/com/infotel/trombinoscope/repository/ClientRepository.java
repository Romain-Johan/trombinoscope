package com.infotel.trombinoscope.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.infotel.trombinoscope.entity.Client;

@RepositoryRestResource(exported = false)
public interface ClientRepository extends MongoRepository<Client, String> {

	Optional<Client> findById(String id);
}
