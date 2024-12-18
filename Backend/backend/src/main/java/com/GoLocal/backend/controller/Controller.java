package com.GoLocal.backend.controller;

import com.GoLocal.backend.dto.CustomerResponse;
import com.GoLocal.backend.model.Customer;
import com.GoLocal.backend.model.Seller;
import com.GoLocal.backend.service.CustomerService;
import com.GoLocal.backend.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class Controller {

    @Autowired
    private SellerService sellerService;
    private CustomerService customerService;

    @Autowired
    public Controller(SellerService sellerService, CustomerService customerService) {
        this.sellerService = sellerService;
        this.customerService = customerService;
    }

    //Mappings
    @GetMapping("/")
    public String sayHello()
    {
        return "I am backend of Golocal";
    };

    @GetMapping("/sellers")
    public List<Seller> getAllSeller()
    {
        return sellerService.getAllSeller();
    }

    @GetMapping("/sellers/{id}")
    public Optional<Seller> getSellerById(@PathVariable Long id)
    {
        return sellerService.getSellerById(id);
    }

    @PostMapping("/addSeller")
    public Seller addSeller(@RequestBody Seller seller)
    {
        return sellerService.createSeller(seller);
    }

    @PutMapping("/updateSeller")
    public Seller updateSeller(@RequestBody Seller seller)
    {
        return sellerService.createSeller(seller);
    }

    @DeleteMapping("/deleteSeller/{id}")
    public void deleteSeller(@PathVariable Long id)
    {
        sellerService.deleteSeller(id);
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomer()
    {
        return customerService.getAllCustomer();
    }
    @PostMapping("/signup")
    public Customer registerCustomer(@RequestBody Customer customer)
    {
        return customerService.registerCustomer(customer);
    }

    @PostMapping("/login")
    public CustomerResponse loginCustomer(@RequestBody Customer customer){return  customerService.loginCustomer(customer);}
}
