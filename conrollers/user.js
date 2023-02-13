var USER = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.Secure = async function (req, res, next) {
    try {
        let token = req.headers.id
        var decoded = jwt.verify(token, 'Vivek');
        console.log(decoded);
        let Checkuser = await USER.findById(decoded.id)
        if(!Checkuser){
            throw new Error("User Not Found")
        }
        next()
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Signup = async function (req, res, next) {
    try {
        req.body.userimage = req.file.filename
        if(req.body.password != req.body.cpassword){
            throw new Error("Password Are Not Same")
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await USER.create(req.body)
        var token = jwt.sign({ id:data._id }, 'Vivek');
        res.status(201).json({
            status: "Success",
            message: "Create Account Successfully...",
            data: data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Signin = async function (req, res, next) {
    try {
        let Checkdata = await USER.findOne({email:req.body.email})
        if(!Checkdata){
            throw new Error("User Not Found")
        }
        let passCompare = await bcrypt.compare(req.body.password, Checkdata.password)
        if(passCompare != true){
            throw new Error("Wrong Password")
        }
        var token = jwt.sign({ id:Checkdata._id }, 'Vivek');
        res.status(200).json({
            status: "Success",
            message: "Login Successfully...",
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.ShowUser = async function (req, res, next) {
    try {
       
        let data = await USER.find()
        res.status(200).json({
            status: "Success",
            message: "Show data Successfully...",
            data:data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}