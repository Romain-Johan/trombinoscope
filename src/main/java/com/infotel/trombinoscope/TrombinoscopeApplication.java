package com.infotel.trombinoscope;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.infotel.trombinoscope.controllers.CollaborateurController;

@SpringBootApplication
@ComponentScan(basePackageClasses = CollaborateurController.class)
public class TrombinoscopeApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(TrombinoscopeApplication.class, args);
	}

}
