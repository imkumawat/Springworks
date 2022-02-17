const comment = require('../model/comment')

async function getComments(req, res)
{
    try{
        if(!req.params.idPostArticle)
        {
            console.log("Post Article id is missing")
            return res.status(404).json({message:"idPostArticle is missing"})
        }
        obj = {}
        obj.idPostArticle = req.params.idPostArticle
        await comment.find(obj, {__v:0,_id:0,idPostArticle:0})
        .then(doc=>{
            console.log(doc)
            return res.status(200).json({message:"Ok", data: {"Comments":doc, "count": Object.keys(doc).length}})
        })
        .catch(e=>{
            console.log(e)
            return res.status(500).json({ message: 'Unable to get comments' })
        })

    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = getComments