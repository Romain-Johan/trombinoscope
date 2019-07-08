package com.infotel.trombinoscope.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.infotel.trombinoscope.entity.Collaborateur;

@RepositoryRestResource(exported = false)
public interface CollaborateurRepository extends JpaRepository<Collaborateur, String> {

	Optional<Collaborateur> findById(int id);
}
