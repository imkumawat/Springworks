const jwt = require('jsonwebtoken')
const userProfile = require("../model/userProfile")


async function generateAccessToken(req, res) {
  try {

    
   
    const tokenSecret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6'
    var data
    await userProfile.findOne({"email":req.body.email},{ _id: 0, __v: 0, firstName:0, lastName:0, password:0, imageText:0, creationTime:0 })
    .then(doc=>{
      data=doc
    })
    .catch(e=>{
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    })

    // generating jwt access token and valid for half an hour
    const token = jwt.sign({ data }, tokenSecret, { expiresIn: '1800s' })
    console.log("jwt token generation successful")
    return res.status(200).json({ message: 'Token Generation Success', jwt: token })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Internal Server Error. Please try again later' })
  }
}

module.exports = generateAccessToken