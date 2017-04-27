package org.jojs.validation;

import org.jojs.domain.model.user.User;
import org.jojs.infrastructure.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component("beforeCreateUserValidator")
public class UserValidatorBeforeCreate implements Validator {
    @Autowired
    private UserRepository repository;

    @Override
    public boolean supports(final Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(final Object o, final Errors errors) {
        User user = (User) o;
        if (null != repository.findByUserName(user.getUserName()))
        {
            errors.rejectValue("User", "User already exists");
        }
        if (checkInputString(user.getUserName()))
        {
            errors.rejectValue("name", "name.empty");
        }
    }

    private boolean checkInputString(String input) {
        return (input == null || input.trim().length() == 0);
    }
}
