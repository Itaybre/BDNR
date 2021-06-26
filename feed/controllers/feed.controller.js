const Redis = require('ioredis')
const config = require('config')
const redis = new Redis(config.get('redis'))

exports.getAllFeeds = async (req, res) => {
  return res.status(400).send('Please request a feed for a single user')
}

exports.getFeed = async (req, res) => {
  const userId = req.params.user_id
  if (!(await redis.exists(userId))) {
    return res.status(404).send('User does not have a feed')
  }

  res.send(JSON.parse(await redis.get(userId)))
}

exports.createFeed = async (req, res) => {
  const userId = req.body.userId
  await redis.set(userId, JSON.stringify(req.body))

  res.send(req.body)
}

exports.updateFeed = async (req, res) => {
  const userId = req.params.user_id
  if (userId !== req.body.userId) {
    return res.status(404).send('Body should not contain a different userId')
  }
  if (!(await redis.exists(userId))) {
    return res.status(404).send('User does not have a feed')
  }

  const originalFeed = JSON.parse(await redis.get(userId))
  for (const key in req.body) {
    originalFeed[key] = req.body[key]
  }

  await redis.set(userId, JSON.stringify(originalFeed))
  res.send(originalFeed)
}

exports.destroyFeed = async (req, res) => {
  const userId = req.params.user_id
  if (!(await redis.exists(userId))) {
    return res.status(404).send('User does not have a feed')
  }

  await redis.del(userId)
  res.send('Deleted successfully')
}
