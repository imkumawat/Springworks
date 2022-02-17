const userProfile = require("../model/userProfile")
const crypto = require('crypto');
const {verifyuseremail} = require('./signUp')

async function login(req, res, callback)
{

    try{
        if(!req.body.email)
        {
            console.log("email is missing")
            return res.status(404).json({message: "email is missing"})
        }

        if(!req.body.password)
        {
            console.log("Password is missing")
            return res.status(404).json({message: "password is missing"})
        }

        if (!verifyuseremail(req.body.email)) {
            console.log('Email id is invalid')
            return res.status(400).json({ message: 'Invalid email' })
        }
        const passwordHash = crypto.createHash('md5').update(req.body.password).digest("hex");

        obj = {}
        obj.email  = req.body.email
        obj.password = passwordHash
        let exist = await userProfile.findOne(obj)

        if(exist)
        {
            console.log("Credential verified")
            callback()
        }

        else{
            console.log("Wrong credentiala")
            return res.status(404).json({message:"Invalid credentials"})
        }
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).josn({ message: "Internal Server Error" })
    }
}

module.exports = login