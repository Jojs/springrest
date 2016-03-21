# Basic Spring REST web service - Project log
Exploring basic rest service with Spring

## Initial setup
2016-03-20, 11.30-12.30  
Exploring GIT. Setting up project page [Basic Spring REST web service](http://jojs.github.io/springrest/).
Writing project purpose and starting on enterprise considerations. 

## Reading and initial source
2016-03-20, 15.45-16.45  
Starting from [Building REST APIs With Spring Boot](http://ryanjbaxter.com/2014/12/17/building-rest-apis-with-spring-boot/)
Using [Spring initializr](http://start.spring.io/)
Thinking about clustering/load balancing. Hitting http://stackoverflow.com/questions/2205157/how-to-cluster-and-load-balance-a-spring-osgi-app
And then http://servicemix.apache.org/ - reading excitedly - wants to create a project with that - partly because I know that Talend runtime is/was more or less build with these products. I want the ESB and Camel as well. Also why not use something compliant with JPA, JAX-WS, etc.!?

## Adjusting source
2016-03-20, 18.00-19.15  
Adding model classes. Discussing DDD structure. Wants to create realistic postal address. Then remembers that internationalisation is not in the scope of this project. Don't have time to read Vaugh Vernon right now, but will have to find out how he uses ports rather than infrastructure (I got a vague idea, though). 
Remembers Martin Fowlers patterns on organisation - shh - still not the scope of this project.

## Adjusting source
2016-03-20, 20.15-20.30  
Repositories  
20.30-20.35  
API  
Switching guide: http://spring.io/guides/gs/accessing-mongodb-data-rest/  
20.35-20.40  
Installing homebrew and MongoDB  
20.40-23.00  
Running MonogDB  
Testing, playing around with Postman  
Adding DB-references between models.  
Adding collection to Postman  
Learning how to handle collections on REST  

## Heroku
2016-03-21, 11.00-13.00
Account on Heroku, installing toolbelt
11.15 - 
Considering in-memory MongoDB
Nice write-up here, good for testing (http://dontpanic.42.nl/2015/02/in-memory-mongodb-for-unit-and.html)
Deciding on a mLab free acoount. Retrofitting app to use this account.
Running app with new db. Checking my Postman collection.
Having trouble with installing app on heroku.
Was missing Procfile with content web:    java -Dserver.port=$PORT -jar  target/springrest-0.0.1-SNAPSHOT.jar

## Heroku
2016-03-21, 15.15-16.00
Nope, really the problem was a folder debt. The pom.xml must be in the root
Seems that Heroku has problems ... taking a break

Wiki on project
Android
Security
Load balancing
Diffs/history

