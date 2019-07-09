package com.infotel.trombinoscope.entity;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Poste {

    @Id
    private String id;

    private String libelle;
}