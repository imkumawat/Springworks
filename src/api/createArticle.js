const article = require("../model/article")
const shortid = require('shortid')
function makeObj(data)
{
    obj = {}

    obj.userName = data.userName
    obj.ids = shortid.generate()
    obj.content = data.content
    obj.imageText = data.imageText
    obj.creationTime = new Date()

    return obj

}

function createArticle(req, res)
{
    try{

        if(!req.body.imageText)
        {
            console.log("Image Text is missing")
            return res.status(404).json({message: "imageText is missing"})
        }

        if(!req.body.content)
        {
            console.log("Caption Text is missing")
            return res.status(404).json({message: "Content is missing"})
        }

        if(!req.body.userName)
        {
            console.log("User name is missing")
            return res.status(404).json({message: "userName is missing"})
        }

        obj = makeObj(req.body)


        article.create(obj)
        .then(doc=>{
            console.log(doc)
            return res.status(201).json({ message: "article created", "ArticleID":obj.ids })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: 'Unable to create article' })
        })

    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = createArticle