const comments = require('../model/comment')
const article = require("../model/article")
const userPost = require("../model/userpost")

function makeObj(data)
{
    obj = {}

    obj.idPostArticle = data.idPostArticle
    obj.userName = data.userName
    obj.comment = data.comment
    obj.commentedAt = new Date()

    return obj
}

async function commentPostArticle(req, res)
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

        if(!req.body.comment)
        {
            console.log("Comment is missing")
            return res.status(404).json({message: "Comment is missing"})
        }

        obj = {}
        obj.ids  =req.body.idPostArticle
        let existInPost = await userPost.findOne(obj)
        let existInArticle = await article.findOne(obj)
    

        if(existInPost || existInArticle)
        {
            obj = makeObj(req.body)

        comments.create(obj)
        .then(doc=>{
            console.log(doc)
            return res.status(201).json({ message: "Commented on Post/Article" })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: 'Unable to comment' })
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
module.exports = commentPostArticle