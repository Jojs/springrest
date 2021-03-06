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

## Heroku
2016-03-21, 17.00-18.15  
Still fighting Heroku. There is a timeout on some port ... talking with support  


## Moving on with AngularJS
2016-03-21, 18.15-19.00  
It was hard to find the answer of where to put files. Went through this: https://spring.io/blog/2015/01/12/spring-and-angular-js-a-secure-single-page-application  
to realise that it was easy. I was just on the brink of creating a new app for this alone, but  - put files under ressoures/static or ressources/public, etc.   

## Found solution on Heroku
2016-03-21, 20.00-20.45  
http://nicholaspaulsmith.com/spring-boot-on-heroku/  
Procfile must contain  
web: java $JAVA_OPTS -Dserver.port=$PORT -jar target/*.jar  

## AngularJS
2016-03-21, 21.30-23.30  
Working on AngularJS. Learning about production ready packaging of sources using wro:  
https://spring.io/blog/2015/01/12/spring-and-angular-js-a-secure-single-page-application  
Reading up on HATEAOS, HAL, ALPS  
Considering:  

## AngularJS
2016-03-21, 21.30-23.30  
Reading up on HATEAOS, HAL, ALPS  
Considering:  
https://github.com/jcassee/angular-hypermedia  
https://github.com/LuvDaSun/angular-hal  
https://github.com/guylabs/angular-spring-data-rest  
To read another day: http://radar.oreilly.com/2013/05/a-matter-of-semantics.html  
Find webjars here:  
http://www.webjars.org/  


Wiki on project  
AngularJS  
Security  
Load balancing  
Diffs/history  

https://github.com/spring-projects/spring-boot/issues/1718  
http://docs.spring.io/spring-data/rest/docs/current/reference/html/#projections-excerpts  

2017-04-17 14.00-14.30  
Signup from frontend  

2017-04-17 19.15-21.15  
Signup from frontend. Realising that there is a lot to learn about spring rest. http://spring.io/guides/tutorials/bookmarks/  

2017-04-18 20.00-00.00  
Stuck in AngularJS Routing and response from rest.  

2017-04-19 19.15-23.15  
Catching up on Angular factories, modules, routers  

2017-04-19 19.15-23.15  
Catching up on Angular factories, modules, routers  

2017-04-21 20.00-01.15  
Creating signup.  
Fighting inheritance in JavaScript

2017-04-22 14.45-15.30  
Cleaning up JS with inheritance

2017-04-22 19.00-22.00  
Learning more bootstrap  
Including newer libraries of bootstrap and ignoring wro since it looks like webjars are not updated.  
Navigation dropdown, buttons for login, signup, logout.  
Cleaning up JS  

2017-04-23 15.00-16.00  
Dynamic load into modal  

2017-04-23 17.00-17.45  
Dynamic load into modal  
Dropping bootstrap and going with UI Bootstrap https://angular-ui.github.io/bootstrap/  
- Keeping Bootstrap CSS because it is still used by Angular UI Bootstrap  

2017-04-23 19.00-22.00  
Dynamic load into modal. Learning Angular Modules.  

2017-04-24 21.00-22.00  
user model - Login - security  

2017-04-25 19.00-00.00  
Login/logout - Spring security and AngularJS is not playing nice together

2017-04-26 19.00-00.00  
Login/logout - Spring security and AngularJS is not playing nice together  
- cannot logout of basic auth because the cookie gets recreated  
- cannot figure out how to simulate form based login in AngularJS 

2017-04-29 12.30.00-23.30  
Finally found the right way to do login and logout. Posted data must be a credentials object with 
password and username and serialized with $httpParamSerializerJQLike. Also headers must be set for 'Content-Type': "application/x-www-form-urlencoded"  
Implementing a very rudimentary signup. Skipping on "remember me" and nice transition to login.  
Implementing primitive UserDetailsService on the user database.  
Implementing user duplication control.  
Working that password strength checker. Turns out http://password-policy-testing.wikidot.com/results is a dead end.  
Found http://www.passay.org/  
- Passay is really nice and allows for implementing all sorts of checks and will also use dictionaries.  
- Deciding to only using a simple example. Will have to look into more elaborate configurations as well as dictionary usage later.  
Refactoring app.js to logical parts.
