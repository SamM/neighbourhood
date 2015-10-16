function JobQueue(){
    var self = this;
	var queue = [];
	
	function next(){
		if(queue.length > 0){
			queue[0].apply(self, [].splice.call(arguments));
		}
	}
	
	this.add = function(fn){
		queue.push(fn);
		if(queue.length == 1){
			next.apply(self, [].splice.call(arguments,1));
		}
		return self;
	};
	
	this.done = function(){
		queue.shift();
		next.apply(self, [].splice.call(arguments));
		return self;
	};
	
	this.quit = function(){
	    queue = [];
	    return self;
	};
}
if(typeof module != "undefined")
    module.exports = JobQueue;