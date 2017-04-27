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
As I understand they are a bit like directives (which I also need to learn) but a bit cleaner and more isolated. 
It is cool that one can basically write custom tags and have them controlled and rendered this way.

## Ajax
$http is just sweet. It took a while to learn to manage the asynch nature and figure out how to simulate form based post.