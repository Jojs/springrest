# AngularJS
## Learning
There is some of a learning curve and already version 1.x is old news.  
Trying to learn this while also learning Spring takes some effort.  
There are a wealth of small tips and examples out there but when you try to experiment and
mix and match one with another you realise that you don't really understand it and you need to 
go much deeper. It is logical but the paradigms and possibilities are very 
different from what I was used to in java, jsp, etc. - mainly backend.  
Many roadblocks have been due to the fact that examples are plenty but things have changed during versions.

## Structure
I very much believe that frontend code must be designed an implemented just 
as strict and organised as backend code. Back in 2005 we were implementing our own 
event bus, implementing mediator pattern and having trouble with loading new scripts and html via Ajax. 
Basically it was much easier to just load all js functionality up front.  

## GUI
Lots of examples mix Bootstrap and AngularJS. There is however [UI Bootstrap](https://angular-ui.github.io/bootstrap/)
which simplifies stuff a bit. But still the examples are fairly small and generic and it takes some experimentation to 
get it right.  

There is a lot to explore. I wanted to use modules but haven't quite got my head around bindings via resolve. 
As I understand modules are a bit like directives (which I also need to learn) but a bit cleaner and more isolated. 
It is cool that one can basically write custom tags and have them controlled and rendered this way.

## Ajax
$http is just sweet. It took a while to learn to manage the asynch nature and figure out how to simulate form based post.

## Frameworks vs Libraries
There are frameworks such as AngularJs Ember, Durandal to create Single Page Apps (SPA). They come with data binding, dependency management, routing, templates, and more.
And there are libraries such as knockout, backbone, require.js, crossroads.js, dust.js and more. These are individual parts focused on one task.
- Knockout and backbone is about data binding
- require.js is dependency management (module loading)
- crossroads.js is routing
- dust.js is is templates  

Together libraries can be used to create a complete framework. For instance the Durandal framework is combining jQuery, Require and Knockout. Angular depends on jQuery and brings its own jqLite if jQuery is not present.

For an example of rolling your own framework, if you really want to copy Durandal, read this blog: http://blogs.lessthandot.com/index.php/WebDev/UIDevelopment/angularjs-vs-knockout-introduction-1/

You can jump to the summary : It is possible to build upon knockout until you have similar functionality as Angular provides:http://blogs.lessthandot.com/index.php/webdev/uidevelopment/angularjs-vs-knockout-final-thoughts-9/

Angular is not by default supporting browsers earlier than IE9, though earlier IE can be supported if oneself implements the documented hacks (using polyfill, etc.). https://docs.angularjs.org/guide/ie

In 2014 one interesting development was that Durandal and Angular converge http://eisenbergeffect.bluespire.com/angular-and-durandal-converge/. If you are in doubt why this is significant, you should read up on the creator of Durandal (Rob Eisenberg)

But apparently Rob Eisenberg left Angular 2.0 November 2014 to 
work on the next version of Durandal, now called [Aurelia](http://aurelia.io/). His own comparisons to Angular can be found 
[here](http://eisenbergeffect.bluespire.com/aurelia-and-angular-2-code-side-by-side/). More on Angular 2.0, a [video](http://oredev.org/2014/sessions/angularjs-2-0)

Also very relevant today is [React](https://facebook.github.io/react/) - I wonder what will be the new hot tomorrow?

There are different reports about the performance and maintainability of the different solutions, but it sounds like a fair part of the trouble is about knowing and reading up about dos and don'ts for each solution.

## Tool Chain
I'm used to work with backend technology and IDE's. Experienced front-end developers are probably using a Node.js based toolchain (e.g. npm, gruntetc.).

## A Quote
The above news, less than five months after my initial analysis tempted me to include the following quote.
http://code.tutsplus.com/tutorials/5-awesome-angularjs-features--net-25651#comment-871356408

> To those wondering, "Should I use AngularJS or not?"
> From a guy whose been in this industry 30 years, with the last 15 dedicated to web application development:
> 1.  Stop looking for the perfect technology stack tha
t you will be able to use from here until you retire. It doesn't exist. I've been through 4 generations of technology stacks over the past 15 years as the Internet, languages, tools, hardware, etc. have all evolved, they have rendered my previous architectural decisions out-dated.
> 2.  You don't have to choose just one JS framework. There's no genie here saying you get one wish and one wish only. Develop your next project with AngularJS. If you like it, keep developing with it. If you don't, try another. There is nothing wrong with having each project built with a different set of frameworks. Fact of that matter, that's going to happen anyway (see my point #1 as to why). 
> 3.  Use AngularJS, knowing full well that, in all likelihood, something better will evolve out of it and, in 5 years, AngularJS will be passé and you'll abandon it in favor of an even better framework. That's a good thing - not a bad thing. The use of these frameworks expose their weakness, which allows AngularJS to improve upon itself, or someone else will take the lessons learned from it and build a framework twice as good. 
> 4.  Finally, the more frameworks you use, the greater your perspective and the more flexible your mind becomes, making it quicker and easier to move from one technology stack to another without fear or intimidation.
