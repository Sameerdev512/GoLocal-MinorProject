package com.GoLocal.backend.controller;

import com.GoLocal.backend.dto.OtpRequest;
import com.GoLocal.backend.dto.OtpValidationRequest;
import com.GoLocal.backend.dto.Response;
import com.GoLocal.backend.service.OtpService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @GetMapping("/checkOtp")
    public String otpApplication() {
        return "Welcome to OTP Service!";
    }

    @PostMapping("/sendOtp")
    public Response sendOtp(@RequestBody OtpRequest otpRequest) {
        // Pass only the email to the service method
        String email = otpRequest.getEmail();
        Response otpResponse = otpService.sendOtp(email);
        return otpResponse;
    }

    @PostMapping("/validateOtp")
    public Response validateOtp(@RequestBody OtpValidationRequest otpValidationRequest) {
        Response validationResponse = otpService.validateOtp(otpValidationRequest);
        return validationResponse;
    }
}
