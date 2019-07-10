package com.infotel.trombinoscope.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.infotel.trombinoscope.entity.Poste;

@RepositoryRestResource(exported = false)
public interface PosteRepository extends MongoRepository<Poste, String> {

	Optional<Poste> findById(String id);
}
