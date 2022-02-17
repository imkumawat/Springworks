const like = require('../model/like')

async function getLikes(req, res)
{
    try{
        if(!req.params.idPostArticle)
        {
            console.log("Post Article id is missing")
            return res.status(404).json({message:"idPostArticle is missing"})
        }
        obj = {}
        obj.idPostArticle = req.params.idPostArticle
        await like.find(obj, {__v:0,_id:0,idPostArticle:0,likedAt:0})
        .then(doc=>{
            console.log(doc)
            return res.status(200).json({message:"Ok", data: {"likeBy":doc, "count": Object.keys(doc).length}})
        })
        .catch(e=>{
            console.log(e)
            return res.status(500).json({ message: 'Unable to get likes' })
        })

    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = getLikes