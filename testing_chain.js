// Testing JobQueue to make chainable module API with async functions
var JobQueue = require("./jobqueue");

function Testing(){
    var queue = new JobQueue();
    var self = this;
    this.state = {
        time: 0
    };
    
    this.onesec = function(){
        function fn(state){
            console.log("Wait 1 second");
            state.time+=1;
            setTimeout(queue.done.bind(queue, state), 1000);
        }
        queue.add(fn, self.state);
        return self;
    }
    
    this.nsecs = function(n){
        function fn(state){
            console.log("Wait "+n+" seconds");
            state.time+=n;
            setTimeout(queue.done.bind(queue, state), n*1000);
        }
        queue.add(fn, self.state);
        return self;
    }
    
    this.logtime = function(){
        function fn(state){
            console.log("state.time = "+state.time);
            queue.done(state);
        }
        queue.add(fn, self.state);
        return self;
    }
    
    this.logselftime = function(){
        function fn(state){
            console.log("self.state.time = "+self.state.time);
            queue.done(state);
        }
        queue.add(fn, self.state);
        return self;
    }
}

var test = new Testing();
test.onesec().nsecs(3).onesec().logtime().logselftime();

module.exports = Testing;