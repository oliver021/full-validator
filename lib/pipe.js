function createPipe(pipe,arr){
	
		this.source = arr;

		createPipe.prototype.resolve = function(current) {
			return pipe.helpers[this.source[0]].call(pipe,current,...this.source[1]);
		};

}

module.exports = function Pipe(validatorFunc,target){

	this.helpers = validatorFunc;
	this.targets = target;
	this.queue = new Array;
	this.result = true;

	Pipe.prototype.append = function(func,args=[]) {
		this.queue.push(new createPipe(this,[ func , Array.isArray(args) ? args : [args] ]));
	};

	Pipe.prototype.resolve = function(current){
		return this.result = this.queue.shift().resolve(current);
	}

	Pipe.prototype.resolveAll = function(current){
	 	var question;
		 while(question=this.queue.shift()){
		 	this.result = question.resolve(current);
		 }
		 return this.result;
	}

	Pipe.prototype.getResult = function(){
		return this.result;
	}

	Pipe.prototype.showRules = function() {
		return this.queue;
	};
}