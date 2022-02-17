const userProfile = require("../model/userProfile")
const comments = require('../model/comment')
const like = require('../model/like')
const article = require("../model/article")
const userPost = require("../model/userpost")


const jwt = require('jsonwebtoken')


async function deleteProfile(req,res)
{
    try
    {
        if(!req.body.userName)
        {
            console.log("User name is missing")
            return res.status(404).json({message: "userName is missing"})
        }
        const tokenSecret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6'

        const data = jwt.verify(req.headers.authorization, tokenSecret)
        
        console.log(data)

        if(req.body.userName == data.data.userName)
        {
            
            await userProfile.deleteMany({"email":data.data.email})
            .then(doc=>{
                console.log("User profile delete")
            })
            .catch(e=>{
                console.log("Unable to delete user profile")
            })

            await comments.deleteMany({"userName":data.data.userName})
            .then(doc=>{
                console.log("User comments delete")
            })
            .catch(e=>{
                console.log("Unable to delete user comments")
            })

            await like.deleteMany({"userName":data.data.userName})
            .then(doc=>{
                console.log("User likes delete")
            })
            .catch(e=>{
                console.log("Unable to delete user likes")
            })

            await article.deleteMany({"userName":data.data.userName})
            .then(doc=>{
                console.log("User article delete")
            })
            .catch(e=>{
                console.log("Unable to delete user articles")
            })
        
            await userPost.deleteMany({"userName":data.data.userName})
            .then(doc=>{
                console.log("User posts delete")
            })
            .catch(e=>{
                console.log("Unable to delete user posts")
            })

            return res.status(200).json({ message: "Account Deleted" })
        }

        else{
            console.log("You are not authorized")
            return res.status(400).json({ message: "You are not Authorized" })

        }


    

    return res.status(200).json({message: "check console"})



    }
    
    catch(e)
    {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = deleteProfile