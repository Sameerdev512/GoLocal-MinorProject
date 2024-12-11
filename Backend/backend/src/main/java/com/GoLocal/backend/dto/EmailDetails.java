package com.GoLocal.backend.dto;

import lombok.Builder;

@Builder
public class EmailDetails {

    private String recipient;
    private String messageBody;
    private String subject;

    // Default constructor
    public EmailDetails() {
    }

    // Parameterized constructor
    public EmailDetails(String recipient, String messageBody, String subject) {
        this.recipient = recipient;
        this.messageBody = messageBody;
        this.subject = subject;
    }

    // Getters and Setters
    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getMessageBody() {
        return messageBody;
    }

    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "EmailDetails{" +
                "recipient='" + recipient + '\'' +
                ", messageBody='" + messageBody + '\'' +
                ", subject='" + subject + '\'' +
                '}';
    }
}
