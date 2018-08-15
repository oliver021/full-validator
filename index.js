/**
*
*@package Query Validator
*@author Oliver Valiente
*@types types.d.js
*@root index.js
*@exports
*/

const forIn = require('for-in');
const compile = require('./lib/ruleCompile');
var extendValidator = new Object;

function validate(current,rule,values){
	rulesItarator = compile(rule,extendValidator,values);
	return rulesItarator.resolveAll(current);

}

function run(object,validator){
	forIn( validator.rules, (rule, name) => {
		let current = object[name];
		let result = validate(current,rule,object);
		if(result===false)
			validator.error[name] = result;
		else
			validator.succefull[name] = result;
	});
	validator.isFail = Object.values(validator.error).indexOf(false) > 0;
}


function Validator(rules){

	this.rules=rules;
	this.error = {};
	this.succefull = {};

 Validator.prototype.append = function(key,rule) {
 	this.rules[key]=rule;
 };

 Validator.prototype.then = function(cb) {
 	this.cbThen = cb;
 	return this;
 };


Validator.prototype.catch = function(cb) {
 	this.cbCatch = cb;
 	return this;
 };

 Validator.prototype.eval = function(target) {
 	run(target,this);
 	if(this.isFail){
 		if(typeof this.cbCatch === 'function') this.cbCatch();
 	}else{
 		if(typeof this.cbThen === 'function') this.cbThen();
 	}
 	return this;
 };

 Validator.prototype.passes = function(target) {
 	if(this.isFail === undefined) run(target,this);
 	return !this.isFail;
 };

 Validator.prototype.haveError = function(){
 	return this.isFail !== undefined && this.isFail === true;
 };

  Validator.prototype.extend = function(name,fnEval,force=false){
  	if(extendValidator.hasOwnProperty(name) && force === false)
  		throw new Error('Exists a helper with same name, use force params with true value to overwrite');
 	extendValidator[name]=fnEval;
 	return this;
 };

}

module.exports = function(rules){
	 return new Validator(rules);
}