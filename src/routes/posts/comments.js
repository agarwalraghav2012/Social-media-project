const { Router } = require('express')
const {
  createNewComment,
  findAllComments
} = require('../../controllers/comments')
const commentsRoute = Router()

commentsRoute.get('/:id', async (req,res) => {
  const comments = await findAllComments(req.params.id) ;
  res.status(200).send(comments)
})
// Temprary ---------------------------------------------------------------
commentsRoute.get('/', async (req,res) => {
  const comments = await findAllComments(20) ;
  res.status(200).send(comments)
})

commentsRoute.post('/', async (req, res) => {
  const { userId, title, body, postId } = req.body

  if ((!userId) || (!title) || (!body) || (!postId)) {
    return res.status(400).send({
      error: 'Need userid, title, postId and body to create comment'
    })
  }

  const comment = await createNewComment(userId, title, body, postId)
  res.status(201).send(comment)
})

module.exports = {
  commentsRoute
}