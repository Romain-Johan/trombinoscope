package com.infotel.trombinoscope;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

import com.infotel.trombinoscope.controllers.CollaborateurController;
import com.infotel.trombinoscope.property.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class TrombinoscopeApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(TrombinoscopeApplication.class, args);
	}

}
