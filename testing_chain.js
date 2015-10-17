// Testing JobQueue to make chainable module API with async functions
var WorkQueue = require("./workqueue");

function Testing(){
    var work = new WorkQueue();
    var self = this;
    work.state = {
        time: 0
    };
    
    this.onesec = function(){
        function job(done, state){
            console.log("Wait 1 second");
            state.time+=1;
            setTimeout(done, 1000);
        }
        work.append(job);
        return self;
    }
    
    this.nsecs = function(n){
        function job(done, state){
            console.log("Wait "+n+" seconds");
            state.time+=n;
            setTimeout(done, n*1000);
        }
        work.append(job);
        return self;
    }
    
    this.logtime = function(){
        function job(done, state){
            console.log("state.time = "+state.time);
            done();
        }
        work.append(job);
        return self;
    }
    
    this.logworktime = function(){
        function job(done, state){
            console.log("work.state.time = "+work.state.time);
            done();
        }
        work.append(job);
        return self;
    }
    
    this.task = function(job){
        work.append(job);
        return self;
    }
}

var test = new Testing();
test.onesec()
    .nsecs(3)
    .task(function(done, state){ 
        state.hello = "world";
        done();
    })
    .onesec()
    .logtime()
    .logworktime()
    .task(function(done, state){ 
        console.log("state.hello = "+state.hello);
        done();
    });

module.exports = Testing;