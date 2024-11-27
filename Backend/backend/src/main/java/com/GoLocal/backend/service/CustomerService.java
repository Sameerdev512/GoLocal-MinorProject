package com.GoLocal.backend.service;

import com.GoLocal.backend.model.Customer;
import com.GoLocal.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomer()
    {
        return customerRepository.findAll();
    }
    public Customer saveCustomer(Customer customer)
    {
        return customerRepository.save(customer);
    }
}
