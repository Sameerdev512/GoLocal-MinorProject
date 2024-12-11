package com.GoLocal.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OtpValidationRequest {
    private String email;
    private String otp;
}
