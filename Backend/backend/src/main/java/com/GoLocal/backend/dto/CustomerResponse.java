package com.GoLocal.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomerResponse {
    private String loginMessage;
    private boolean loginSuccessful;
    private String signupMessage;
//    private boolean userExists; //for not allowing user to create multiple account with same email
}
