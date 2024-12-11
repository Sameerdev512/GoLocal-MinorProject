package com.GoLocal.backend.repository;

import com.GoLocal.backend.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import org.springframework.stereotype.Repository;
//
@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
  Otp findByEmail(String email);
}
