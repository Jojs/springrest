package org.jojs.infrastructure.persistence;

import org.jojs.domain.model.company.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanyRepository extends MongoRepository<Company, String> {
    List<Company> findByName(@Param("name") String name);
}
