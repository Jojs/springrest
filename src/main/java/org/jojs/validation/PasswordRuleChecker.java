package org.jojs.validation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.Rule;
import org.passay.RuleResult;
import org.passay.RuleResultDetail;
import org.passay.WhitespaceRule;

class PasswordRuleChecker {

    private final List<Rule> rules = Arrays.asList(
            new LengthRule(8, 30),
            new CharacterRule(EnglishCharacterData.UpperCase),
            new CharacterRule(EnglishCharacterData.Digit),
            new CharacterRule(EnglishCharacterData.Special),
            new WhitespaceRule());

    private final PasswordValidator validator = new PasswordValidator(rules);

    private RuleResult ruleResult = null;
    private boolean isValid = false;

    PasswordRuleChecker(String password) {
        if (null != password) {
            PasswordValidator validator = getValidator();
            ruleResult = validator.validate(new PasswordData(password));
            isValid = ruleResult.isValid();
        }
    }

    boolean isValid() {
        return isValid;
    }

    List<String> getErrorCodes() {
        ArrayList<String> result = new ArrayList<>();
        for (RuleResultDetail ruleResultDetail : getRuleResultDetails()) {
            result.add(ruleResultDetail.getErrorCode());
        }
        return result;
    }

    List<RuleResultDetail> getRuleResultDetails() {
        if (null != ruleResult) {
            return ruleResult.getDetails();
        }
        return Collections.emptyList();
    }

    List<String> getMessages() {
        if (null != ruleResult) {
            return validator.getMessages(ruleResult);
        }
        return Collections.emptyList();
    }

    int getNumberOfRules() {
        return rules.size();
    }

    private PasswordValidator getValidator() {
        return validator;
    }

}
