var userService = require('../servicess/userService');
exports.createUser = (req, res) => {
    try {
        //check validation of data
        
        req.checkBody('fname', 'Name is not valid').isLength({ min: 3 }).isAlpha();
        req.checkBody('lname', 'Name is not valid').isLength({ min: 3 }).isAlpha();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('phonenumber', 'Phone number is not valid').isLength(10);
        var errors = req.validationErrors();
        var responseResult = {};
        // any error occurs in validation it goes to if condition
        if (errors) {
            // console.log(errors);
            console.log("err in controller");
            responseResult.status = false;
            responseResult.message = errors;
            res.status(422).send(responseResult);
        }
        else {
            // console.log("else in controller");
            var responseResult = {};
            // here sending a request in services
            userService.createUser(req.body, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
                    responseResult.success = true;
                    responseResult.result = result;
                    responseResult.message = "Registration Successfull"
                    res.status(200).send(responseResult.message);
                }
            })
        }
    }
    catch (err) {
        console.log(err);

    }
}

exports.getAllUsers = (req,res) => {
    userService.getAllUsers(req, (err, data) => {
        var responseResult = {};
        if (err) {
            return callback(err);
        } else {
            //console.log("datbase user data==>",data);
            responseResult.success = true;
            responseResult.result = data;
            res.status(200).send(responseResult);
        
        }
    })
}

exports.updateUserData = (req, res) => {
    var responseResult = {};
    userService.updateUserData(req, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}

exports.deleteUser = (req,res) => {
    userService.deleteUser(req, (err, data) => {
        var responseResult = {};
        if (err) {
            return callback(err);
        } else {
            //console.log("datbase user data==>",data);
            responseResult.success = true;
            responseResult.result = data;
            res.status(200).send(responseResult);
        
        }
    })
}