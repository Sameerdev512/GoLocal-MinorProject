package com.GoLocal.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.annotations.processing.Pattern;
import jakarta.validation.constraints.*;

@Entity
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String shopName;
    private String ownerName;
    private String category;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
    private String websiteLink;


    //constructor
    public Seller()
    {

    }

    public Seller(Long id, String shopName, String ownerName, String category, String firstName, String lastName, String email, String contactNo, String websiteLink) {
        this.id = id;
        this.shopName = shopName;
        this.ownerName = ownerName;
        this.category = category;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNo = contactNo;
        this.websiteLink = websiteLink;
    }

    //Getter & Setter Methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getWebsiteLink() {
        return websiteLink;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }


    //toString method
    @Override
    public String toString() {
        return "Seller{" +
                "id=" + id +
                ", shopName='" + shopName + '\'' +
                ", ownerName='" + ownerName + '\'' +
                ", category='" + category + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", contactNo='" + contactNo + '\'' +
                ", websiteLink='" + websiteLink + '\'' +
                '}';
    }
}
