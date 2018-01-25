# Authentication and Authorization
## Spring Security
### Log in/out
Ouch! I got some bad burns here because AngularJS can't logout of basic auth because the cookie gets recreated. 
Form based login must be used and it took a long while to figure out how to simulate form login in AngularJS.  

### Auth and Authz
There is a lot to learn. For what I know it looks very complete and capable.  
I want to get around to explore it further and integrate it with a solution such as [Apache Fortress](http://directory.apache.org/fortress/)  

## Password Strength Checker
Does a password strength checker help?  
A talk with a friend about passwords and security triggered the question
"Does a password strength checker help?"  
Googling this the answer seems to be "yes, because it makes the user think more". Nevertheless some are better than others,
so in this project I am going to test a few and eventually combine their strengths. A good checker needs access to a 
dictionary so an ajax call to the server will be used to further check password strength.  

I wanted to base my experiment on this result: http://password-policy-testing.wikidot.com/results  
Because this research is from ultimo 2014 I recommend that up-to-date research must be done before applying this 
in production today.  
Working with password strength checker it turned out http://password-policy-testing.wikidot.com/results is 
not readily usable and multiple links are obsolete. However it is probably still a good starting point when designing
password policies.  
Found http://www.passay.org/  
- Passay is really nice and allows for implementing all sorts of checks and will also use dictionaries.  
- Deciding to only using a simple example. Will have to look into more elaborate configurations as well as dictionary usage later.  

## Password Security Beyond Users choice  
The best and strongest password is worth nothing if the service provider isn't handling it properly. 
It is clear that that a very big responsibility lies with the service provider which have to protect against both 
online and offline attacks.  
A summary of research (2014) about this can seen here: https://nakedsecurity.sophos.com/2014/10/24/do-we-really-need-strong-passwords/  

Online attacks can be deflected with ip-bans, one hour locking of an account after three failed attempts, etc.  
Offline attacks only happens if the malicious person gets direct access to data - so any physical or remote access must be
properly secured. This can be difficult when sensitive data is stored together with an applications general 
data and running instances. Because a running applcation often needs to be serviceable by support and technical personel, etc. 
and often multiple integrations with other systems are required, it opens up to multiple attack vectors. Keeping sensitive
data in a separate runtime and preferably physical system helps in simplifying the task of securing and restricting access
and allows for procedures, passwords, etc. that can be completely different from the standards applied to the
main application.  

## Password Encryption
Passwords must be encrypted and have separate salts. Best of all is to use a slow hash function  
There is a really good description here: https://crackstation.net/hashing-security.htm  
A data breach can still happen but passwords are only relevant in the time between decryption and until an admin discovers the 
breach and have resetall users passwords. To make it difficult and time consuming to decrypt passwords they should be 
individually hashed with a time and RAM consuming key derivation function such as PBKDF2 
(https://en.wikipedia.org/wiki/PBKDF2, also read critics), 
bcrypt, scrypt and Argon2 (https://en.wikipedia.org/wiki/Argon2)

## User Behavior
No matter what, users have a tendency to use the same combination of email, username and password on other sides, so I think
it is very important to warn users about that risk when they are alerted about the reset of their passwords. I conclude that
together with all other security measures, is important to have procedures and mechanisms in place to quickly reset 
passwords and send out information to users - should the worst case scenario become real 
(or should I say when, as seen for even very large corporations).

# Full authentication and Authorization framework
In my professional work I very much like to use the ApacheDS LDAP for storing general user data and passwords. It provides
password policies for quality, expiration and lockout, a good selection of password encryption options and more such 
as Kerberos server and SASL integrations. I combine it with Apache Fortress to get a complete ANSI standard compliant 
role based access control (RBAC) system for managing permissions in the application. Fortress also comes with a JavaEE REALM
implementation and a standalone REST service for use with for instance mobile apps and SPA's.
https://iamfortress.net/2015/02/16/apache-fortress-end-to-end-security-tutorial/  

