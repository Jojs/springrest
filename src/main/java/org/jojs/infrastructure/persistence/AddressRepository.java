package org.jojs.infrastructure.persistence;

import org.jojs.domain.model.address.Address;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AddressRepository extends MongoRepository<Address, String> {}
