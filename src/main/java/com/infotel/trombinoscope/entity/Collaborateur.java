package com.infotel.trombinoscope.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "collaborateur")
public class Collaborateur {

    @Id
	private String id;

    private String firstname;
    private String lastname;
    private int age;
    private String picture;
    private Poste job;
    private Client mission;
    private String skills;
    private Date joinedDate;
}