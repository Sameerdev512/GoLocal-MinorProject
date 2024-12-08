package com.GoLocal.backend.service;


import com.GoLocal.backend.dto.EmailDetails;
import com.GoLocal.backend.dto.OtpValidationRequest;
import com.GoLocal.backend.dto.Response;
import com.GoLocal.backend.model.Otp;
import com.GoLocal.backend.model.Seller;
import com.GoLocal.backend.repository.OtpRepository;
import com.GoLocal.backend.repository.SellerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service

public class OtpService {

    private static final Logger log = LoggerFactory.getLogger(OtpService.class);

    private final OtpRepository otpRepository;
    private final SellerRepository sellerRepository;
    private final EmailService emailService;

    @Value("${otp.expiration.minutes:2}") // Default to 2 minutes if not configured
    private int otpExpirationMinutes;

    public OtpService(OtpRepository otpRepository, SellerRepository sellerRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.sellerRepository = sellerRepository;
        this.emailService = emailService;
    }

    // Method to fetch email and send OTP
    public Response sendOtp(String email) {
        try {
            // Validate if seller exists with the provided email
            Optional<Seller> sellerOptional = sellerRepository.findByEmail(email);
            if (sellerOptional.isEmpty()) {
                return Response.builder()
                        .statusCode(404)
                        .responseMessage("Seller with email " + email + " not found.")
                        .build();
            }
            // Generate OTP
            String otp = com.otp.authorization.utils.OtpGenerator.generateOtp();
            log.info("Generated OTP for {}: {}", email, otp);

            // Save OTP to the database
            otpRepository.save(Otp.builder()
                    .email(email)
                    .otp(otp)
                    .expireAt(LocalDateTime.now().plusMinutes(otpExpirationMinutes))
                    .build());

            // Prepare email details
            EmailDetails emailDetails = EmailDetails.builder()
                    .subject("GO LOCAL OTP")
                    .recipient(email)
                    .messageBody("Your OTP is: " + otp + ". It is valid for " + otpExpirationMinutes + " minutes.")
                    .build();

            // Send email
            emailService.sendEmail(emailDetails);

            return Response.builder()
                    .statusCode(200)
                    .responseMessage("OTP sent successfully to email: " + email)
                    .build();
        } catch (Exception e) {
            log.error("Error occurred while sending OTP for {}: {}", email, e.getMessage(), e);
            return Response.builder()
                    .statusCode(500)
                    .responseMessage("Failed to send OTP.")
                    .build();
        }
    }

    // Method to validate OTP
    public Response validateOtp(OtpValidationRequest otpValidationRequest) {
        try {
            // Check if OTP exists for the given email
            Optional<Otp> optionalOtp = Optional.ofNullable(otpRepository.findByEmail(otpValidationRequest.getEmail()));
            if (optionalOtp.isEmpty()) {
                return Response.builder()
                        .statusCode(400)
                        .responseMessage("No OTP found for the given email.")
                        .build();
            }

            Otp otp = optionalOtp.get();

            // Check if the OTP is expired
            if (otp.getExpireAt().isBefore(LocalDateTime.now())) {
                return Response.builder()
                        .statusCode(400)
                        .responseMessage("Expired OTP.")
                        .build();
            }

            // Check if the OTP matches
            if (!otp.getOtp().equals(otpValidationRequest.getOtp())) {
                return Response.builder()
                        .statusCode(400)
                        .responseMessage("Invalid OTP.")
                        .build();
            }

            // Delete OTP after successful validation
            otpRepository.delete(otp);

            return Response.builder()
                    .statusCode(200)
                    .responseMessage("OTP validated successfully.")
                    .build();
        } catch (Exception e) {
            log.error("Error occurred while validating OTP for {}: {}", otpValidationRequest.getEmail(), e.getMessage(), e);
            return Response.builder()
                    .statusCode(500)
                    .responseMessage("Failed to validate OTP.")
                    .build();
        }
    }
}
