package com.infotel.trombinoscope.entity;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Competence {
    
    @Id
    private String id;
    
    private String libelle;

}