package com.GoLocal.backend.controller;

import com.GoLocal.backend.dto.OtpRequest;
import com.GoLocal.backend.dto.OtpResponse;
import com.GoLocal.backend.dto.OtpValidationRequest;
import com.GoLocal.backend.service.OtpService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
//@AllArgsConstructor
@RequestMapping("/otp")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @GetMapping("/checkOtp")
    public String otpApplication() {
        return "welcome";
    }

    @PostMapping("/sendOtp")
    public OtpResponse sendOtp(@RequestBody OtpRequest otpRequest) {
        OtpResponse response = otpService.sendOtp(otpRequest);
        return response;
        //return ResponseEntity.ok(Response);
    }

    @PostMapping("/validateOtp")
    public OtpResponse validateOtp(@RequestBody OtpValidationRequest otpValidationRequest) {
        OtpResponse validationResponse = otpService.validateOtp(otpValidationRequest);
        return validationResponse;
    }
}

