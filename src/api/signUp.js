const userProfile = require("../model/userProfile")
const crypto = require('crypto');

function verifyuseremail(email) {
    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email) { return false }

    if (email.length > 254) { return false }

    const valid = tester.test(email)
    if (!valid) { return false }

    // Further checking of some things that regex can't handle
    const parts = email.split('@')
    if (parts[0].length > 64) { return false }

    const domainParts = parts[1].split('.')
    if (domainParts.some((part) => part.length > 63)) { return false }

    return true
}

function makeObj(data)
{
    obj = {}

    obj.userName = data.userName
    obj.firstName = data.firstName
    obj.lastName = data.lastName
    obj.email = data.email
    obj.password = crypto.createHash('md5').update(data.password).digest("hex");
    obj.imageText = data.imageText
    obj.creationTime = new Date()

    return obj

}

function signUp(req,res)
{
    try{

        if(!req.body.firstName)
        {
            console.log("First name is missing")
            return res.status(404).json({message: "firstName is missing"})
        }
        if(!req.body.lastName)
        {
            console.log("Last name is missing")
            return res.status(404).json({message: "lastName is missing"})
        }

        if(!req.body.userName)
        {
            console.log("User name is missing")
            return res.status(404).json({message: "userName is missing"})
        }

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

        if(!req.body.imageText)
        {
            console.log("Image Text is missing")
            return res.status(404).json({message: "imageText is missing"})
        }

        if (!verifyuseremail(req.body.email)) {
            console.log('Email id is invalid')
            return res.status(400).json({ message: 'Invalid email' })
        }

        obj = makeObj(req.body)

        userProfile.create(obj)
        .then(doc=>{
            console.log(doc)
            return res.status(201).json({ message: "user created" })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: 'Unable to create user or duplicate email not allowed' })
        })
    }
    catch(e){

        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {signUp, verifyuseremail}