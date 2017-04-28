package org.jojs.validation;

import java.security.Principal;
import java.util.Collections;

import org.jojs.domain.model.user.User;
import org.jojs.infrastructure.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Service
@RestController
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUserName(username);

        if (user == null)
            throw new UsernameNotFoundException("Name not found!");

        // List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), Collections.emptyList());
    }

    @RequestMapping("/checkPassword")
    public int checkPassword(@Param("password") String password) {
        PasswordRuleChecker ruleChecker = new PasswordRuleChecker(password);
        if (ruleChecker.isValid()) {
            return 4;  // return ruleChecker.getNumberOfRules();
        } else {
            return 4 /*ruleChecker.getNumberOfRules()*/ - ruleChecker.getMessages().size();
        }
    }
}
