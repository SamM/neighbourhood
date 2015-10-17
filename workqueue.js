function WorkQueue(){
    var self = this;
	var queue = [];
	this.state = {};
	
	function next(){
		if(queue.length > 0){
			queue[0].bind(self, self.done, self.state).apply(self, [].splice.call(arguments,0));
		}
	}
	
	this.append = function(fn){
		queue.push(fn);
		if(queue.length == 1){
			next.apply(self, [].splice.call(arguments,1));
		}
		return self;
	};
	
	this.insert = function(fn, index){
	    if(index >= queue.length){
	        queue.push(fn);
	    }else{
    	    var updated_queue = queue.splice(0,index);
    	    updated_queue.push(fn);
    	    queue = updated_queue.concat(queue.splice(index));
        }
	    if(queue.length == 1){
			next.apply(self, [].splice.call(arguments,2));
		}
		return self;
	}
	
	this.done = function(){
		queue.shift();
		next.apply(self, [].splice.call(arguments,0));
		return self;
	};
	
	this.quit = function(){
	    queue = [];
	    return self;
	};
}
if(typeof module != "undefined")
    module.exports = WorkQueue;