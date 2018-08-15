const validator = require('validator');

module.exports = {

	min:function(string,num){
		return validator.isLength(string,{min:num});
	},

	max:function(string,num){
		return validator.isLength(string,{max:num});
	},

	match:function(string,regExp){
		return (new RegExp(global.eval(regExp))).test(string);
	},

	same:function(string,compare){
		return string === this.targets[compare];
	}

}