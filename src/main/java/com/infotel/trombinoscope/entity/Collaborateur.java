package com.infotel.trombinoscope.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Collaborateur {

    @Id
    @GeneratedValue
	private int id;

    private String firstname;
    private String lastname;
    private int age;
    private String picture;
    private String job;
    private String mission;
    private String skills;
    private Date joinedDate;
}