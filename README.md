# Company Index
Company Index is a small application I use for learning and experimenting with techniques for web development.
A running application can be seen [here](https://springrest-jojs.herokuapp.com/app.html#!/)  
Once logged in a full  HATEOAS REST api is available at the root [here](https://springrest-jojs.herokuapp.com/) 

## Compile and run
Run the server Command-line:  
`mvn spring-boot:run`  

Or run the main method in UIApplication.java  
```
$ mvn package
$ java -jar target/*.jar
```

Access the server on http://localhost:8080/  

## General Structure
The structure is loosely based on DDD but might be too simple to really shine. 
I try to write as little boilerplate code as possible. 
A variant of inheritance is used in the JavaScript domain model.

## Basic Requirements
### Rest
Create a tiny REST / JSON web service with an API that supports the following:  
Create new company  
Get a list of all companies  
Get details about a company  
Able to update a company (TODO)  
Able to add beneficial owner(s) of the company (TODO)  

A company has the following attributes:  
Company ID  
Name  
Address  
City  
Country  
E-mail (not required)  
Phone Number (not required)  
One or more directors and beneficial owners.  

[More thoughts on REST services](docs/REST.md)

### JavaScript client
Create a tiny client using AngularJS.
[More thoughts on AngularJS](docs/ANGULARJS.md)

### Authentication and Authorization
Use Spring Security and build from here.
[More thoughts on Authentication and Authorization](docs/AUTH.md)

## Hosting and SCM
Upload code to github and deploy to Heroku (using Docker - TODO)

## Redundancy, scalability, modularity
How can we make the service redundant, scalable and modular?  
An interesting modular solution is outlined as the "API gateway" : https://spring.io/guides/tutorials/spring-security-and-angular-js/

## Not building from Scratch
Even though Spring and Angular is great and enables so much functionality with very 
little boilerplate code there are even faster ways to create applications. On this project I must have used around 70 hours for the result 
as is 2017-04-27 (and counting). In contrast I used a few hours working on https://github.com/Jojs/apacheisisrestgui/blob/master/README.md
and in general the frontend is still more complete than what I have achieved with 70 hours here. 
Note that both approaches was without previous experience and as such I am comparing the learning and productivity.  

## Personal Purpose
2016-03-20  
Almost every project I ever worked on were already years old, save for a few handful of mobile apps. Here I will explore how to start from scratch. In coming projects I will see how to harness the solution to enterprise scale.
Why choose Spring and rest? What do you do when entering unknown territory? - I call a friend :-) And he said "Springboot and rest", and sure enough there are lots of examples to find online. 
I use Spring for production and enterprise today. However, I have a little larger requirements to the final solution than this initial experiment will deliver, and that means building on top of this with other frameworks.
