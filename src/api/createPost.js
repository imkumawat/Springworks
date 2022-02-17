const userPost = require("../model/userpost")
const shortid = require('shortid')

function makeObj(data)
{
    obj = {}
    obj.ids = shortid.generate()
    obj.userName = data.userName
    obj.captionText = data.captionText
    obj.imageText = data.imageText
    obj.creationTime = new Date()

    return obj

}


function createPost(req, res)
{
    try{

        if(!req.body.imageText)
        {
            console.log("Image Text is missing")
            return res.status(404).json({message: "imageText is missing"})
        }

        if(!req.body.captionText)
        {
            console.log("Caption Text is missing")
            return res.status(404).json({message: "Caption Text is missing"})
        }

        if(!req.body.userName)
        {
            console.log("User name is missing")
            return res.status(404).json({message: "userName is missing"})
        }

        obj = makeObj(req.body)


        userPost.create(obj)
        .then(doc=>{
            console.log(doc)
            return res.status(201).json({ message: "post created" , "PostID":obj.ids})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ message: 'Unable to create post' })
        })

    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = createPost