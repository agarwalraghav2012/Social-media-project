const { Posts, Comments, Users } = require('../db/models') ;

async function createNewComment(userId, title, body, postId) {
    const comment = await Comments.create({
      title,
      body,
      userId,
      postId
    })
  
    return comment
  }
  
async function findAllComments(id) {
    // TODO: Handle query params
    const comments = await Comments.findAll({
      include: [ Posts, Users ] ,
      where: {
        postId: id
      }
    })
    return comments
}
  
module.exports = {
    createNewComment,
    findAllComments
}

/*
async function task() {
      await createNewComment(
        4,
        'This is a sample comment',
        'Body of the comment goes here',
        20
      ),
      await createNewComment(
        10,
        'Another sample comment',
        'Some body example here as well',
        20
      )

    const comments = await findAllComments(20) ;
    for (let c of comments) {
      //console.log(c) ;
      console.log(` Comment-Title:${c.title}\n Comment-Author:${c.user.username}\n Comment-Body:${c.body}\n Post-Title: ${c.post.title}\n Post-Author:${c.post.userId} \n===============================\n`)
    }
}
task().catch((err)=> console.log(err))
*/
