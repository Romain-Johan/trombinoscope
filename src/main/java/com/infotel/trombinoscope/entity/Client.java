package com.infotel.trombinoscope.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Client {
    
    @Id
    private String id;
    
    private String libelle;

}