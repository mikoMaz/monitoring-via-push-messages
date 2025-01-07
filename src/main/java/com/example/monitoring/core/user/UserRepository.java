package com.example.monitoring.core.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByAuthTokenSubject(String subject);
    List<User> findUsersByCompanyCompanyId(Long companyId);
}
