package com.infotel.trombinoscope;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.infotel.trombinoscope.repository.CollaborateurRepository;

/**
 * @author Romain JOHAN
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final CollaborateurRepository collaborateurRepository;

	@Autowired
	public DatabaseLoader(CollaborateurRepository collaborateurRepository) {
		this.collaborateurRepository = collaborateurRepository;
	}

	@Override
	public void run(String... strings) throws Exception {
		
	}
}
