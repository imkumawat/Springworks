const express = require("express")
const router = express.Router()

const {signUp} = require('../api/signUp')
router.post('/signup/',signUp)

const generateAccessToken = require('../auth/generateAccessToken')
const login = require('../api/login')
router.post('/login/',login, generateAccessToken)

const verifyAccessToken = require("../auth/verifyAccessToken")
const createPost = require('../api/createPost')
router.post('/createpost/', verifyAccessToken, createPost)

const deleteProfile = require('../api/deleteProfile')
router.put('/deleteprofile', verifyAccessToken, deleteProfile)

const createArticle = require('../api/createArticle')
router.post('/createarticle/', verifyAccessToken, createArticle)

const addLike = require('../api/addLike')
router.post('/addlike/', verifyAccessToken, addLike)

const addComment = require('../api/addComment')
router.post('/addcomment/', verifyAccessToken, addComment)

const getLike = require('../api/getLikes')
router.get('/getlike/:idPostArticle',verifyAccessToken, getLike)

const getComments = require('../api/getComments')
router.get('/getcomment/:idPostArticle',verifyAccessToken, getComments)

module.exports = router