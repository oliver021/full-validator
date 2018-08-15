/**
*
*@interface HandleValdator
*/

interface HandleValidator {
	(  current : string, ...args:string[] ) : boolean;
}

declare class Validator {

constructor( rules : Object ) ;

	
	/**
	*@method
	*/
	then( fn : Function) : Validator;
	
	/**
	*@method
	*/
	cacth( fn : Function) : Validator;
	
	/**
	*@method
	*/
	extend( name : string , fn : HandleValidator) : Validator;
	
	/**
	*@method
	*/
	passes(target : Object) : boolean;
	
	/**
	*@method
	*/
	eval(target : Object) : Validator;
	
	/**
	*@method
	*/
	append(key:string,rule:string) : Validator;
	
	/**
	*@method
	*/
	haveError () : boolean;
}

export = Validator;