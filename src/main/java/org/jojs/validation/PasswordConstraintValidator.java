package org.jojs.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.google.common.base.Joiner;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public void initialize(ValidPassword arg0) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        PasswordRuleChecker passwordRuleChecker = new PasswordRuleChecker(password);
        if (passwordRuleChecker.isValid()) {
            return true;
        }
        else {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    Joiner.on("n").join(passwordRuleChecker.getMessages()))
                    .addConstraintViolation();
        }
        return false;
    }
}