package com.GoLocal.backend.service;

import com.GoLocal.backend.model.Seller;
import com.GoLocal.backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerService {
    @Autowired
    private SellerRepository sellerRepository;

    public List<Seller> getAllSeller() {
        return sellerRepository.findAll();
    }

    public Optional<Seller> getSellerById(Long Id) {
        return sellerRepository.findById(Id);
    }

    public Seller createSeller(Seller seller) {
        return sellerRepository.save(seller);
    }

    public void deleteSeller(Long Id) {
        sellerRepository.deleteById(Id);
    }
}
