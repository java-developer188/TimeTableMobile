export class ValidateInputs{

  // Check user value is empty

  static checkEmptyUserInput(userValue){
    return (userValue==0 ? true : false);
  }

    static validateSection(userValue){
        var re = /^(([A-Z]{2}|[a-z]{2}|[A-Z][a-z]|[a-z][A-Z])[0-9])|(([A-Z]|[a-z])(?![A-Z]|[a-z]))$/
        return re.test(userValue);
    }

    static validateBatch(userValue){
        var re = /^\d+$/
        return re.test(userValue);
    }

    static validateEmail(userValue){
        var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
        return re.test(userValue);
    }


    // Validating Account Number by checking empty input , numeric value and user value count digits
  static checkAccountNumber(key, userValue){

    var result  = true;
    var msg = '';

    // check account number is numeric
    var numeric  = userValue.match(/^\d+$/);

    if (this.checkEmptyUserInput(userValue)) {
      result =  false;
      // alert(key + ' cannot be empty');
      msg = key + ' cannot be empty';
    }
    else if (!numeric) {
        // alert(key + ' should be in numeric');
        result = false;
        msg = key + ' should be in numeric';
    }
    // Check if account number is 14 digits
    else if (userValue.length!=14)
    {
        // alert(key + ' should be 15 digits');
        msg  =  key + ' should be 15 digits';
        result =false;
    }

    return msg;


    /*

    if(num.match(/^\d+$/)){
  //valid integer
}else if(num.match(/^\d+\.\d+$/)){
  //valid float
}else{
  //not valid number
}

    */

  }

  // Validating Mobile Number by checking empty input , numeric value and user value count digits

  static checkMobileNumber(key, userValue){

    var result  = true;
    var msg = '';

    // check mobile  number is numeric
    var numeric  = userValue.match(/^\d+$/);

   if (!numeric) {
        // alert(key + ' should be in numeric');
        result = false;
        msg = key + ' should be in numeric';
    }
    // Check if mobile number is greaterthan 4 digits and lessthan 15 digits
    else if (userValue.length<4 && userValue.length>15)
    {
        // alert(key + ' should be in between 4 to 15 digits');
        msg = key + ' should be in between 4 to 15 digits';
        result = false;
    }

    return msg;
  }

  // Validating OTP Number by checking empty input , numeric value and user value count digits

  static checkOTPNumber(key, userValue){

    var result  = true;
    var msg = '';
    // check mobile  number is numeric
    var numeric  = userValue.match(/^\d+$/);

    if (this.checkEmptyUserInput(userValue)) {
      result =  false;
      // alert(key + ' cannot be empty');
      msg = key + ' cannot be empty';
    }
    else if (!numeric) {
        // alert(key + ' should be in numeric');
        result = false;
        msg = key + ' should be in numeric';
    }
    // Check if otp doesn't have 5 digits
    else if (userValue.length!=5)
    {
        // alert(key + ' should be 5 digits');
        msg = key + ' should be 5 digits';
        result = false;
    }

    return msg;
  }

  // Validating Username by checking empty input and regex expression

  static checkUsername(key, userValue, expression){

    var result  = true;
    var msg = '';

    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (this.checkEmptyUserInput(userValue)) {
      result =  false;
      // alert(key + ' cannot be empty');
      msg = key + ' cannot be empty';
    }
    // Check if otp doesn't have 5 digits
    /*
    else if (expression.test(userValue) && !checkEmptyUserInput(expression))
    {
        // alert(key + ' should be 5 digits');
        msg = key + ' should match username policy';
        result = false;
    }
    */

    return msg;
  }


}
