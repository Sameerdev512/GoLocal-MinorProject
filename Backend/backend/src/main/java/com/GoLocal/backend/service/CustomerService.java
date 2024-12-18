package com.GoLocal.backend.service;

import com.GoLocal.backend.dto.CustomerResponse;
import com.GoLocal.backend.model.Customer;
import com.GoLocal.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private CustomerService(PasswordEncoder passwordEncoder)
    {
        this.passwordEncoder = passwordEncoder;
    }

    //jdbc connection
    final String username = "root";
    final String password = "Admin@2004";
    final String url = "jdbc:mysql://localhost:3306/backend";


    public List<Customer> getAllCustomer()
    {
        return customerRepository.findAll();
    }
    public Customer registerCustomer(Customer customer)
    {
        String hashedPassword = passwordEncoder.encode(customer.getPassword());
        System.out.println(customer.getPassword());
        System.out.println(hashedPassword);

        Customer new_customer = new Customer();
            new_customer.setPassword(hashedPassword);
            new_customer.setEmail(customer.getEmail());
            new_customer.setFirstName(customer.getFirstName());
            new_customer.setLastName(customer.getLastName());
            new_customer.setUserName(customer.getUserName());
       return customerRepository.save(new_customer);
    }

    public CustomerResponse loginCustomer(Customer customer){

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        try{
            String query = "select password from customer where email = ?";
            Connection conn = DriverManager.getConnection(url,username,password);
            PreparedStatement psmt = conn.prepareStatement(query);
            psmt.setString(1, customer.getEmail());
            ResultSet rs = psmt.executeQuery();

            String customerPasswordDB = "";
            if(rs.next())
            {
                customerPasswordDB = rs.getString("password");
                System.out.println(customerPasswordDB);
            }

            if(passwordEncoder.matches(customer.getPassword(),customerPasswordDB)){
                System.out.println("successfully verified");
                return CustomerResponse.builder()
                        .loginMessage("Login Successfully")
                        .loginSuccessful(true)
                        .build();

            }
        }catch(SQLException e)
        {
            System.out.println(e.getMessage());
        }
        return CustomerResponse.builder()
                .loginMessage("Login Failed")
                .loginSuccessful(false)
                .build();
    }
}
