const like = require('../model/like')
const article = require("../model/article")
const userPost = require("../model/userpost")

function makeObj(data)
{
    obj = {}

    obj.idPostArticle = data.idPostArticle
    obj.userName = data.userName
    obj.likedAt = new Date()

    return obj
}

async function likePostArticle(req, res)
{
    try{
        if(!req.body.idPostArticle)
        {
            console.log("Post/Article id is missing")
            return res.status(404).json({message: "Post/Article id is missing"})
        }


        if(!req.body.userName)
        {
            console.log("User name is missing")
            return res.status(404).json({message: "userName is missing"})
        }

        obj = {}
        obj.ids  =req.body.idPostArticle
        
        let existInPost = await userPost.findOne(obj)
        let existInArticle = await article.findOne(obj)
    

        if(existInPost || existInArticle)
        {
            obj = makeObj(req.body)

        like.create(obj)
        .then(doc=>{
            console.log(doc)
            return res.status(201).json({ message: "Post/Article liked" })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: 'Unable to like' })
        })
    }
        else
        {
            console.log("No Post/Article found")
            return res.status(500).json({ message: 'No Post/Article found' })
        }
        }

    catch(e)
    {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
module.exports = likePostArticle