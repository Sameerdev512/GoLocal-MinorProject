package com.GoLocal.backend.service;

import com.GoLocal.backend.dto.EmailDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailSender;

    /**
     * Sends an email using the provided EmailDetails.
     *
     * @param emailDetails Object containing email recipient, subject, and body.
     */
    public void sendEmail(EmailDetails emailDetails) {
        try {
            // Create a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(emailSender);
            mailMessage.setTo(emailDetails.getRecipient());
            mailMessage.setSubject(emailDetails.getSubject());
            mailMessage.setText(emailDetails.getMessageBody());

            // Send the email
            javaMailSender.send(mailMessage);

            log.info("Email sent successfully to {}", emailDetails.getRecipient());
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", emailDetails.getRecipient(), e.getMessage(), e);
        }
    }
}
