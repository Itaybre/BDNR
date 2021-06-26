const { Router } = require('express')

const { getAllFeeds, getFeed, createFeed, updateFeed, destroyFeed } = require('../controllers/feed.controller')

const router = Router()

router.get('/feeds', getAllFeeds)
router.post('/feeds', createFeed)

router.get('/feeds/:user_id', getFeed)
router.put('/feeds/:user_id', updateFeed)
router.delete('/feeds/:user_id', destroyFeed)

module.exports = router
