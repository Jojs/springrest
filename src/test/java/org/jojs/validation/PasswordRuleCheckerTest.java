package org.jojs.validation;

import java.util.List;

import org.junit.Test;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

public class PasswordRuleCheckerTest {

    @Test
    public void space_char_is_an_error() throws Exception {
        // Setup
        String password = " \t";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertTrue(errorCodes.contains("ILLEGAL_WHITESPACE"));
    }

    @Test
    public void no_space_is_good() throws Exception {
        // Setup
        String password = "1234";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertFalse(errorCodes.contains("ILLEGAL_WHITESPACE"));
    }

    @Test
    public void less_than_8_chars_is_an_error() throws Exception {
        // Setup
        String password = "1234567";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertTrue(errorCodes.contains("TOO_SHORT"));
    }

    @Test
    public void more_than_30_chars_is_an_error() throws Exception {
        // Setup
        String password = "1234567890123456789012345678901";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertTrue(errorCodes.contains("TOO_LONG"));
    }

    @Test
    public void between_8_and_30_chars_is_good() throws Exception {
        // Setup
        String password = "12345678";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertFalse(errorCodes.contains("TOO_SHORT"));
        assertFalse(errorCodes.contains("TOO_LONG"));

        // Setup
        password = "123456789012345678901234567890";
        // Execute
        ruleChecker = new PasswordRuleChecker(password);
        errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertFalse(errorCodes.contains("TOO_SHORT"));
        assertFalse(errorCodes.contains("TOO_LONG"));

        // Setup
        password = "12345678901234567890";
        // Execute
        ruleChecker = new PasswordRuleChecker(password);
        errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertFalse(errorCodes.contains("TOO_SHORT"));
        assertFalse(errorCodes.contains("TOO_LONG"));
    }

    @Test
    public void no_uppercase_chars_is_an_error() throws Exception {
        // Setup
        String password = "a";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertTrue(errorCodes.contains("INSUFFICIENT_UPPERCASE"));
    }

    @Test
    public void uppercase_char_is_good() throws Exception {
        // Setup
        String password = "A";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertFalse(errorCodes.contains("INSUFFICIENT_UPPERCASE"));
    }

    @Test
    public void no_digits_is_an_error() throws Exception {
        // Setup
        String password = "abcABC*@%";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertTrue(errorCodes.contains("INSUFFICIENT_DIGIT"));
    }

    @Test
    public void digit_is_good() throws Exception {
        // Setup
        String password = "0";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertFalse(errorCodes.contains("INSUFFICIENT_DIGIT"));
    }

    @Test
    public void no_special_char_is_an_error() throws Exception {
        // Setup
        String password = "abcABC";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertTrue(errorCodes.contains("INSUFFICIENT_SPECIAL"));
    }


    @Test
    public void special_char_is_good() throws Exception {
        // Setup
        String password = "@";
        // Execute
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        List<String> errorCodes = ruleChecker.getErrorCodes();
        // Validate
        assertFalse(errorCodes.contains("INSUFFICIENT_SPECIAL"));
    }


}