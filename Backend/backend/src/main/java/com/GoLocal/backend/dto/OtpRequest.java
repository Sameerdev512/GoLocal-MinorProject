package com.GoLocal.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpRequest {
    private String email;

    // Manually defining the getter method
    public String getEmail() {
        return email;
    }

    // Optionally, setter method as well
    public void setEmail(String email) {
        this.email = email;
    }
}
