const bcrypt = require('bcrypt');
const { body } = require('express-validator/check');
var saltRounds = 10;
var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;
// Setup schema
var userSchema = mongoSchema({
    fname: {
        type: String,
        required: [true, "First Name is required"]
    },
    lname: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    phonenumber: {
        type: Number,
        required: [true, "phone number is required"]
    },

});
var user = mongoose.model('user', userSchema);
function userModel() { }

userModel.prototype.createUser = (body, callback) => {
    user.find({
        "email": body.email
    }, (err, data) => {
        if (err) {
            console.log("Error in Registration");
            callback("User Already Present")
        }
        else {

            const newUser = new user({
                "fname": body.fname,
                "lname": body.lname,
                "email": body.email,
                "phonenumber": body.phonenumber
            });
            newUser.save((err, result) => {
                if (err) {
                    console.log("Model not found");
                    callback(err, result);
                } else {
                    console.log("Registered Successfully");
                    callback(null, result)
                }
            })
        }
    });
}



userModel.prototype.updateUserData = (req, callback) => {

    // console.log('in model--data:--', req);
    console.log('in model--body:--', req.body);
    user.find({ "email": req.body.email }, function (err, data) {
        

        user.updateOne({ "email": req.body.email, "phonenumber": req.body.phonenumber, "email": req.body.email, "phonenumber": req.body.phonenumber }, function (err, dat) {
            if (err)
                callback("You Last login Yesterday");
            else {
                callback("Success")
            }
        })
    })
}


userModel.prototype.getAllUsers = (req, callback) => {
    user.find({}, (err, data) => {
        if (err) {
            callback("error is in model" + err)
        } else {
            callback(null, data);
        }
    })
}


userModel.prototype.deleteUser = (req, callback) => {
    user.findOne({ "email": req.body.email }, (err, data) => {
        if (err) {
            callback("error is in model deleteUser" + err)
        } else {
            var myquery = { "email": req.body.email };
            console.log("myquery", myquery)
            user.deleteOne(myquery, function (err, obj) {
                if (err) throw err;
                else {
                    console.log("1 record deleted");
                }
            });
            callback(null, data);
        }
    })
}

module.exports = new userModel();
