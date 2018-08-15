var Validator = require('./');
var compileFunc = require('./lib/ruleCompile');
var PipeClass = require('./lib/pipe');
var assert = require('assert');
const extend = require('xtend');
const validator = require('validator');
const core = require('./lib/core');

const apiValidator = extend(validator,core);


/*describe('Test components of the module', function(){

	it('this component is function:',()=>{
		assert.equal(typeof compileFunc,'function');
	});

	it('the result is instance of pipe:',()=>{
		assert.equal(compileFunc("a:b") instanceof PipeClass,true);
	});

	it('pipe class is working', function(){
		let pipe = new PipeClass(apiValidator);
		pipe.append('min',61);
		assert.equal(pipe.resolve('1232456'),false);

		pipe.append('min',5);
		assert.equal(pipe.resolve('1232456'),true);

		pipe.append('match', '"[0-9]"');
		assert.equal(pipe.resolve('1232456'),true);

		pipe.append('isEmail');
		assert.equal(pipe.resolve('hello@32base.net'),true);
	});

	it('this components is working: ', () => {
 		var pipe = compileFunc('min:6|match:"[a-b]"');

 		var result =  pipe.resolve('2332354');

 		assert.equal(result,true);

 		var result =  pipe.resolve('http://');

 		assert.equal(result,false);
	});

	it('pipe class is ready to integrate a module', () => {
 		var pipe = compileFunc('max:9|match:"[a-o]"|isEmail');

		let result = pipe.resolveAll("abc@gmail.com");

		assert.equal(result,true);
	});

})*/


describe('Test validator system for query : module testing', function(){

	it('It basic resolve valid values', () => {
		let objects = {
				username:'hello@gmail.com',
				password:'19578*Adef',
				confirm:'19578*Adef'
		}

		let value = Validator({
			username:'isEmail',
			password:'same:confirm|min:8'
		});

		assert.equal(value.passes(objects),true);
	});

	it('It basic promise style validations', () => {
		let objects = {
				username:'hello@gmail.com',
				password:'123456',
				confirm:'123456'
		}

		let value = Validator({
			username:'isEmail',
			password:'same:confirm|min:8|match:"[1-6]"'
		}).then(function(){
			console.log(' ','good is working');
		}).catch(function(){
			throw new Error('fail, should expect a result true');
		});

		value.eval(objects);

	});
});