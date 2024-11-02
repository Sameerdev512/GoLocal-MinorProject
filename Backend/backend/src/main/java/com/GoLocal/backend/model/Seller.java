package com.GoLocal.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String shopName;
    private String ownerName;
    private String email;
    private String contactNo;
    private String category;

    //constructor
    public Seller()
    {

    }

    public Seller(Long id, String shopName, String ownerName, String email, String contactNo, String category) {
        this.id = id;
        this.shopName = shopName;
        this.ownerName = ownerName;
        this.email = email;
        this.contactNo = contactNo;
        this.category = category;
    }
    //Getter & Setter Methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getshopName() {
        return shopName;
    }

    public void setshopName(String shopName) {
        this.shopName = shopName;
    }

    public String getownerName() {
        return ownerName;
    }

    public void setowner(String ownerNameName) {
        this.ownerName = ownerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getcontactNo() {
        return contactNo;
    }

    public void setcontactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    //toString method


    @Override
    public String toString() {
        return "Seller{" +
                "id=" + id +
                ", shopName='" + shopName + '\'' +
                ", ownerName='" + ownerName + '\'' +
                ", email='" + email + '\'' +
                ", contactNo='" + contactNo + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
