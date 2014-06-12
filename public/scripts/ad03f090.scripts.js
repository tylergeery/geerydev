"use strict";angular.module("geeryDevApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngAnimate","LocalStorageModule","angularFileUpload"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){a.when("/about",{templateUrl:"partials/main",controller:"MainCtrl"}).when("/portfolio",{templateUrl:"partials/portfolio",controller:"PortfolioCtrl"}).when("/apps",{templateUrl:"partials/apps",controller:"AppsCtrl"}).when("/",{templateUrl:"partials/blog",controller:"BlogCtrl"}).when("/requests",{templateUrl:"partials/blog",controller:"BlogCtrl"}).when("/requests/:id",{templateUrl:"partials/single",controller:"BlogCtrl"}).when("/login",{templateUrl:"partials/login",controller:"LoginCtrl"}).when("/signup",{templateUrl:"partials/signup",controller:"SignupCtrl",authenticate:!0}).when("/settings",{templateUrl:"partials/admin/settings",controller:"SettingsCtrl",authenticate:!0}).when("/moderate",{templateUrl:"partials/admin/moderate",controller:"ModCtrl",authenticate:!0}).otherwise({redirectTo:"/"}),b.html5Mode(!0),c.interceptors.push(["$q","$location",function(a,b){return{responseError:function(c){return 401===c.status||403===c.status?(b.path("/login"),a.reject(c)):a.reject(c)}}}])}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$routeChangeStart",function(a,d){d.authenticate&&!c.isLoggedIn()&&b.path("/login")})}]),angular.module("geeryDevApp").controller("MainCtrl",["$scope","$http","$location","Blog",function(a,b,c,d){a.sideStuffers=d.query({limit:5}),a.scroll=0,a.followBlog=function(a){c.path("/requests/"+a)},a.scroll=0}]),angular.module("geeryDevApp").controller("HeadbarCtrl",["$scope","$location","$http","Auth","Blog",function(a,b,c){a.research=function(){a.query?c.get("/api/blogs/search/"+encodeURIComponent(a.query).toLowerCase()).success(function(b){console.log("Success"+b),a.results=b}).error(function(){console.log("Failure")}):a.results=null},a.followBlog=function(a){b.path("/requests/"+a)}}]),angular.module("geeryDevApp").controller("NavCtrl",["$scope","$http","$timeout",function(a,b,c){a.quotes=[{content:"The reality is that writing is a lonely, private and poor-paying affair.  For every writer kissed by fortune, there are thousands more whose longing is never requited",author:"Alex Haley"},{content:"Only put off until tomorrow what you are willing to die having left undone",author:"Pablo Picasso"},{content:"There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle",author:"Albert Einstein"},{content:"So go ahead, fall down.  The world looks different from the ground",author:"Oprah"},{content:"It requires us to admit that we really do not know what the truth is in these cases. When compared to the intolerant views with which we began, this is a refreshing outcome",author:"Steve Feldman"}],a.currentQuote=0,a.quote=a.quotes[0];var d=function(){a.showNav||(a.currentQuote<a.quotes.length-1?a.currentQuote++:a.currentQuote=0,a.quote=a.quotes[a.currentQuote]),c(d,5e3)};c(d,5e3),a.getWidth=function(){return $(window).width()},a.$watch(a.getWidth,function(b){768>b&&(a.showNav=!0)}),window.onresize=function(){a.$apply()},a.showNav=!1}]),angular.module("geeryDevApp").controller("BlogCtrl",["$scope","$rootScope","$http","$routeParams","$location","$route","$sce","$resource","$timeout","Blog","Comment","localStorageService",function(a,b,c,d,e,f,g,h,i,j,k,l){if(c.get("/api/blogs?exists=response").success(function(b){a.blogs=b}),a.reply={},a.single={},b.follow=0,a.filter=!1,a.question=!1,a.information=!1,a.success=!1,d.id){var m="/api/blogs/"+d.id;c.get(m).success(function(b){console.log("BLOG: "+JSON.stringify(b)),a.single=b,a.comments=k.query({id:d.id})})}a.filterOptions=[{name:"Comments",use:"totalComments"},{name:"Recent",use:"created"},{name:"Mystery",use:"random"}],a.useFilter=function(b){"random"==b?a.blogs=n(a.blogs):j.query({filter:b},function(b){console.log("Success!"),a.blogs=b},function(){console.log("There was an error!")})};var n=function(a){for(var b,c,d=a.length;d;)c=Math.floor(Math.random()*d--),b=a[d],a[d]=a[c],a[c]=b;return a};a.followBlog=function(a){e.path("/requests/"+a)},b.setFollow=function(a){b.follow=a},a.showError=function(){return a.leaveComment&&a.replyWarning&&!a.reply.content?!0:!1},a.submitReply=function(b,c){console.log("Response to: "+b),console.log("Blog ID: "+c),b&&(a.reply.responseTo=b),c&&(a.reply.responseHead=c),a.reply.content?(console.log("comment: "+JSON.stringify(a.reply)),a.reply.blogId=d.id,k.save({reply:a.reply},function(){console.log("Got Here!"),f.reload()},function(a){console.log("Got an error! "+a),f.reload()})):a.replyWarning="Reply area needs your Response"},a.submitLike=function(a){var b="/api/comments/like/"+a._id;l.get(a._id)?console.log("Local Storage Works!"):c.get(b).success(function(){l.add(a._id,a._id),a.likes++})},a.setPost=function(){a.blog.question&&j.save(a.blog,function(b,c){console.log("Saving..."),c&&(a.filter=!1,a.question=!1,a.information=!1,a.success="Question successfully submitted",i(function(){a.success=!1},3e3),a.blog={})}).$promise},a.subscribe=function(){var b="/api/subscribe";console.log(a.subscriberEmail),c.post(b,{email:a.subscriberEmail}).success(function(){a.filter=!1,a.question=!1,a.information=!1,a.success="Thank you for subscribing to GeeryDev",i(function(){a.success=!1},3e3),a.subscriberEmail=""}).error(function(){console.log("We have an error with login")})},a.scroll=0,a.sideStuffers=j.query({limit:5})}]).filter("unsafe",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),angular.module("geeryDevApp").controller("LoginCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/moderate")}).catch(function(b){b=b.data,a.errors.other=b.message})}}]),angular.module("geeryDevApp").controller("SignupCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")}).catch(function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.type})})}}]),angular.module("geeryDevApp").controller("SettingsCtrl",["$scope","User","Auth",function(a,b,c){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."}).catch(function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password"})}}]),angular.module("geeryDevApp").controller("ModCtrl",["$scope","$upload","Auth","$location","$http","$route","$rootScope","Comment","Blog","User","Project",function(a,b,c,d,e,f,g,h,i,j,k){a.editUsers=!1,a.showComments=!0,a.showPosts=!1,a.showSubscribers=!1,a.showProjects=!1,a.newForm=!1,a.activeComments=[],a.showContextOverlay=!1,a.filenames=[],a.projects=k.query(),a.newProject={},e.get("/api/blogs/sum").success(function(b){console.log("Got something:",JSON.stringify(b)),a.blogTitles=b,a.activeBlog=a.blogTitles[0],a.newComments()}).$promise,a.deleteUser=function(a){j.remove({id:a},function(){f.reload()},function(a){console.log(a)})},a.logout=function(){c.logout()},a.newComments=function(){a.activeBlog&&(a.activeComments=h.query({id:a.activeBlog._id}))},a.deleteComment=function(a){h.remove({id:a},function(){f.reload()},function(a){console.log(a)})},a.posts={},a.blog={},a.toDo="add",a.topComments={},a.requests={},a.illustrateResource=function(){a.newForm=!1,a.exists=!1,a.blog={}},a.showAdmin=function(b){a.editUsers=!1,a.showComments=!1,a.showPosts=!1,a.showSubscribers=!1,a.showProjects=!1,0===b?a.showComments=!0:1===b?(a.showPosts=!0,a.posts=i.query()):2===b?(a.editUsers=!0,a.users=j.list()):3===b?(a.showSubscribers=!0,e.get("/api/subscribers").success(function(b){a.subscribers=b}).error(function(){console.log("Failure")})):(a.showProjects=!0,a.projects=k.query())},a.makePost=function(b){a.newForm=!0,a.exists=!0,a.blog=b},a.makeEmptyPost=function(){a.newForm=!0},a.setPost=function(){a.blog.response&&a.blog.question&&a.blog.askedBy&&(a.blog._id?i.update(a.blog,function(b,c){console.log("Updating..."),c&&(a.posts=i.query(),a.newForm=!1)}).$promise:i.save(a.blog,function(b,c){console.log("Saving..."),c&&(a.posts=i.query(),a.newForm=!1)}).$promise)},a.deletePost=function(b){console.log("Index: "+b),console.log("Blog: "+JSON.stringify(a.posts[b])),i.remove({id:a.posts[b]._id},function(){a.posts=i.query()})},a.toggle=function(){a.toDo="add"==a.toDo?"delete":"add"},a.onFileSelect=function(c){for(var d=0;d<c.length;d++){var e=c[d];a.upload=b.upload({url:"/api/images",file:e}).success(function(b){console.log(b),a.filenames.push(b.name)})}a.fileClicked=function(b){a.input_string="<img src='/images/uploads/"+b+"' />",g.$broadcast("add",a.input_string),console.log(a.input_string)}},a.deleteProject=function(b){k.remove(b,function(b){b&&console.log(b),a.projects=k.query()})},a.saveProject=function(b){k.save(b,function(b){b&&console.log(b),a.projects=k.query()})}}]),angular.module("geeryDevApp").controller("AppsCtrl",["$scope",function(a){a.apps=[{uri:"images/web.png",name:"Alculator",content:"Have you ever wondered if there was more alcohol in 26oz of Red Stripe, or 750ml of chardonnay and which one was most cost-effective.  Well, we did so we made an app."},{uri:"images/mobile.png",name:"SociAlarm",content:"An alarm clock app that allows friends to suggest youtube videos, and randomly selects one to be your morning alarm clock"}]}]),angular.module("geeryDevApp").controller("PortfolioCtrl",["$scope","Project",function(a,b){a.stuff=b.query()}]),angular.module("geeryDevApp").factory("Auth",["$location","$rootScope","Session","User","$cookieStore",function(a,b,c,d,e){return b.currentUser=e.get("user")||null,e.remove("user"),{login:function(a,d){var e=d||angular.noop;return c.save({email:a.email,password:a.password},function(a){return b.currentUser=a,e()},function(a){return e(a)}).$promise},logout:function(a){var d=a||angular.noop;return c.delete(function(){return b.currentUser=null,d()},function(a){return d(a)}).$promise},createUser:function(a,c){var e=c||angular.noop;return d.save(a,function(a){return b.currentUser=a,e(a)},function(a){return e(a)}).$promise},removeUser:function(a,c){var e=c||angular.noop;return d.remove(a,function(a){return b.currentUser=a,e(a)},function(a){return e(a)}).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.update({oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},currentUser:function(){return d.get()},isLoggedIn:function(){var a=b.currentUser;return!!a}}}]),angular.module("geeryDevApp").factory("Session",["$resource",function(a){return a("/api/session/")}]),angular.module("geeryDevApp").factory("Blog",["$resource",function(a){return a("/api/blogs/:id",{id:"@_id"},{get:{method:"GET",isArray:!1},update:{method:"PUT"},remove:{method:"DELETE"},sum:{method:"GET",id:"sum"}})}]),angular.module("geeryDevApp").factory("Comment",["$resource",function(a){return a("/api/comments/:id",{id:"@_id"},{update:{method:"PUT"},remove:{method:"DELETE"}})}]),angular.module("geeryDevApp").factory("User",["$resource",function(a){return a("/api/users/:id",{id:"@id"},{update:{method:"PUT",params:{}},get:{method:"GET",params:{id:"me"}},list:{method:"GET",params:{id:"list"},isArray:!0}})}]),angular.module("geeryDevApp").factory("Project",["$resource",function(a){return a("/api/projects/:id",{id:"@_id"},{update:{method:"PUT"},remove:{method:"DELETE"}})}]),angular.module("geeryDevApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}}),angular.module("geeryDevApp").directive("myText",["$rootScope",function(a){return{link:function(b,c){a.$on("add",function(a,b){var d=c[0];if(document.selection){d.focus();var e=document.selection.createRange();e.text=b,d.focus()}else if(d.selectionStart||0===d.selectionStart){var f=d.selectionStart,g=d.selectionEnd,h=d.scrollTop;d.value=d.value.substring(0,f)+b+d.value.substring(g,d.value.length),d.focus(),d.selectionStart=f+b.length,d.selectionEnd=f+b.length,d.scrollTop=h}else d.value+=b,d.focus()})}}}]),angular.module("geeryDevApp").directive("scrollPosition",["$window",function(a){return{scope:{scroll:"=scrollPosition"},link:function(b){var c=angular.element(a),d=function(){b.scroll=c.scrollTop()};c.on("scroll",b.$apply.bind(b,d)),d()}}}]);