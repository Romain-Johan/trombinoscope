package com.infotel.trombinoscope.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.infotel.trombinoscope.entity.Competence;

@RepositoryRestResource(exported = false)
public interface CompetenceRepository extends MongoRepository<Competence, String> {

	Optional<Competence> findById(String id);
}
