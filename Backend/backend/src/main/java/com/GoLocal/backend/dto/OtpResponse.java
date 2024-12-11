package com.GoLocal.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OtpResponse {
    private int statusCode;
    private String responseMessage;
    private boolean isOtpValid;
}
