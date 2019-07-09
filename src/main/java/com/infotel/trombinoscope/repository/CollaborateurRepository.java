package com.infotel.trombinoscope.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.infotel.trombinoscope.entity.Collaborateur;

@RepositoryRestResource(exported = false)
public interface CollaborateurRepository extends MongoRepository<Collaborateur, String> {

	Optional<Collaborateur> findById(String id);
}
