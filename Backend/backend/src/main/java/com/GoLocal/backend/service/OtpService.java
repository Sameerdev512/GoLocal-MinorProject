package com.GoLocal.backend.service;

import com.GoLocal.backend.dto.*;
import com.GoLocal.backend.model.Otp;
import com.GoLocal.backend.repository.OtpRepository;
import com.GoLocal.backend.utils.OtpGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpService {

    private static final Logger log = LoggerFactory.getLogger(OtpService.class);

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Value("${otp.expiration.minutes:5}") // Default to 5 minutes if not configured
    private int otpExpirationMinutes;


    public OtpService(OtpRepository otpRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    // Method to send OTP
    public OtpResponse sendOtp(OtpRequest otpRequest) {
        try {
            //taking main given in input by customer
            Optional<Otp> optionalOtp = Optional.ofNullable(otpRepository.findByEmail(otpRequest.getEmail()));

            //don't generate otp if user already registered simply give user registered message
            try{
                Class.forName("com.mysql.cj.jdbc.Driver");
            }catch(Exception e){
                System.out.println(e.getMessage());
            }

            try{
                String query = "select email from customer where email = ?";
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/backend","root","Admin@2004");
                PreparedStatement psmt = conn.prepareStatement(query);
                psmt.setString(1, otpRequest.getEmail());
                ResultSet rs = psmt.executeQuery();

            String emaildb = "";
            if(rs.next())
            {
                emaildb = rs.getString("email");
            }

            if(otpRequest.getEmail().equals(emaildb)){
                System.out.println("User already exists");
                return OtpResponse.builder()
                        .userExists(true)
                        .build();
            }
        }catch(SQLException e)
        {
            System.out.println(e.getMessage());
        }

            //delete otp if generated earlier
            if(!optionalOtp.isEmpty())
            {
                Otp otp2 = optionalOtp.get();
                otpRepository.delete(otp2);
            }

            //generate new otp
            String otp = OtpGenerator.generateOtp(); // Generate OTP
            log.info("Generated OTP for {}: {}", otpRequest.getEmail(), otp);

            // Save OTP to database
            otpRepository.save(Otp.builder()
                    .email(otpRequest.getEmail())
                    .otp(otp)
                    .expireAt(LocalDateTime.now().plusMinutes(otpExpirationMinutes))
                    .build());

            // Prepare email details
            EmailDetails emailDetails = EmailDetails.builder()
                    .subject("GO LOCAL")
                    .recipient(otpRequest.getEmail())
                    .messageBody("Your OTP is: " + otp + ". It is valid for " + otpExpirationMinutes + " minutes.")
                    .build();

            emailService.sendEmail(emailDetails); // Send email

            return OtpResponse.builder()
                    .statusCode(200)
                    .responseMessage("OTP sent successfully.")
                    .isOtpValid(false) // Initially invalid until validated
                    .build();
        } catch (Exception e) {
            log.error("Error occurred while sending OTP for {}: {}", otpRequest.getEmail(), e.getMessage(), e);
            return OtpResponse.builder()
                    .statusCode(500)
                    .responseMessage("Failed to send OTP.")
                    .isOtpValid(false)
                    .build();
        }
    }

    // Method to validate OTP
    public OtpResponse validateOtp(OtpValidationRequest otpValidationRequest) {
        try {
           // Otp optionalOtp = otpRepository.findByEmail(otpValidationRequest.getEmail());
           Optional<Otp> optionalOtp = Optional.ofNullable(otpRepository.findByEmail(otpValidationRequest.getEmail()));
            if (optionalOtp.isEmpty()) {
                return OtpResponse.builder()
                        .statusCode(400)
                        .responseMessage("No OTP found for the given email.")
                        .isOtpValid(false)
                        .build();
            }

            Otp otp = optionalOtp.get();

            //Auto delete otp if it not used and expired
            LocalDateTime expirationTime = otp.getExpireAt();
//            if(LocalDateTime.now() < expirationTime)
//            {
//
//            }

            if (otp.getExpireAt().isBefore(LocalDateTime.now())) {
                //delete otp if it is expired
                otpRepository.delete(otp);
                return OtpResponse.builder()
                        .statusCode(400)
                        .responseMessage("Expired OTP.")
                        .isOtpValid(false)
                        .build();
            }

            if (!otp.getOtp().equals(otpValidationRequest.getOtp())) {
                return OtpResponse.builder()
                        .statusCode(400)
                        .responseMessage("Invalid OTP.")
                        .isOtpValid(false)
                        .build();
            }

            // Optional: Delete OTP after successful validation
            otpRepository.delete(otp);
            return OtpResponse.builder()
                    .statusCode(200)
                    .responseMessage("OTP validated successfully.")
                    .isOtpValid(true)
                    .build();
        } catch (Exception e) {
            log.error("Error occurred while validating OTP for {}: {}", otpValidationRequest.getEmail(), e.getMessage(), e);
            return OtpResponse.builder()
                    .statusCode(500)
                    .responseMessage("Failed to validate OTP.")
                //    .isOtpValid(false)
                    .build();
        }
    }
}
