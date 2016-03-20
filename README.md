# springrest
Exploring basic rest service with Spring

##Project Purpose
2016-03-20, 11.30  
Almost every project I ever worked on were already years old, save for a few handful of mobile apps. Here I will explore how to start from scratch. In coming projects I will see how to harness the solution to enterprise scale.
Why choose Spring and rest? What do you do when entering unknown territory? - I call a friend :-) And he said "Springboot and rest", and sure enough there are lots of examples to find online. 
I use Spring for production and enterprise today. However, I have a little larger requirements to the final solution than this initial experiment will deliver, and that means building on top of this with other frameworks.

##Basic Requirements
Create a tiny REST / JSON web service with an API that supports the following:  
Create new company  
Get a list of all companies  
Get details about a company  
Able to update a company  
Able to add beneficial owner(s) of the company  

A company has the following attributes:  
Company ID  
Name  
Address  
City  
Country  
E-mail (not required)  
Phone Number (not required)  
One or more directors and beneficial owners.  

##Create JavaScript client
Create a tiny client using a well-known Javascript framework e.g. Ember, Angularjs or like.

##Versioning of data
Implement versioning of all the data contained in the database.

##Autentication and Authorization
TODO - propose a protocol / method and justify your choice

##Redundancy
How can you make the service redundant? What considerations should you do?

##Enterprise considerations
###Autentication and Authorization
####Paswords and user data
Passwords must be encrypted and have separate salts. Best of all is to use a slow hash function
There is a really good description here: https://crackstation.net/hashing-security.htm  
Another good strategy is to keep user data on another server than the main data. One standard solution is to use a LDAP hosted separately. Most often these provide salted and encrypted passwords and can integrate with multiple other authorisation services.


##Source project
http://ryanjbaxter.com/2014/12/17/building-rest-apis-with-spring-boot/



##Misc
Upload code to github and deploy to Heroku using Docker
Create an account and upload your code on GitHub and deploy it to Heroku as well. 
See this guide for getting started with Heroku and Docker for local development.


Paragraphs are separated
by a blank line.

Two spaces at the end of a line leave a  
line break.

Text attributes _italic_, 
**bold**, `monospace`.

Bullet list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

A [link](http://example.com).
