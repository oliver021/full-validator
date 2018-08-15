const tokens = require('js-tokens').default;
const Pipe = require('./pipe');
const extend = require('xtend');
const validator = require('validator');
const core = require('./core');
/**
*@package Compile
*@param rule : string
*@return Array
*/

var lastToken = undefined;
var statusTokens = {};

function append(pipe,token){
	if(token === " ")
		return;
	if(token === ','){
		if(lastToken !== ',' && lastToken !== ':' && lastToken !== '|' && statusTokens.arg){
			statusTokens.args.push(token);
		}else{
			throw new Error('token unexpected in rule compilation...');
		}
	}else if(token === ':'){
		if(lastToken !== ',' && lastToken !== ':' && lastToken !== '|'){
			lastToken = token;
			statusTokens.arg=true;
			statusTokens.args=[];
		}else{
			throw new Error('token unexpected in rule compilation...');
		}
	}else if(token === '|'){ //console.log('for');
		if(lastToken !== ',' && lastToken !== ':' && lastToken !== '|' ){
			if(statusTokens.arg === true){
				pipe.append(statusTokens.name,statusTokens.args);
			}else{
				pipe.append(statusTokens.name,[]);
			}
			statusTokens = {};
			lastToken = undefined;	
		}else{
			throw new Error('token unexpected in rule compilation...');
		}
	}else{
		if( [':',',','|',undefined].indexOf(lastToken) !== -1){
			if(statusTokens.arg === true){
					statusTokens.args.push(token);
				}else{
					statusTokens.name = token;
				}
				lastToken = token;
		}else{
			throw new Error('token unexpected in rule compilation, token: '+token);
		}
	}
}

module.exports = function(rule,extra=null,fields){
	var pipe = new Pipe(extend(validator,core,extra),fields);
	rule += "|";
	rule.match(tokens).forEach( token => append(pipe,token) );
	return pipe;
}