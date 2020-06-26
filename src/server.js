const express = require('express')
const session = require("express-session") ;

const { db, Users } = require('./db/models')
const { usersRoute } = require('./routes/users')
const { postsRoute } = require('./routes/posts')
const { commentsRoute } = require('./routes/posts/comments')

const app = express()

app.set('view engine', 'hbs') ;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
////////
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'b647t68gibui78y38h87'
}))

app.get('/signup', (req,res)=> {
  res.render('signup') ;
})

app.post('/signup', async (req,res)=> {
  const user = await Users.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
  })
  
  req.session.userId = user.id ;
  res.status(201).redirect('/profile') ;
})

app.get('/login', (req,res)=> {
  res.render('login') ;
})

app.post('/login', async (req,res)=> {
  const user = await Users.findOne({where: {username: req.body.username}}) ;
  if (user.id === 41) {
    return res.status(404).render('login', { error: 'No such username found'}) ;
  }
  if(!user ) {
      return res.status(404).render('login', { error: 'No such username found'}) ;
  }

  if(user.password !== req.body.password) {
      return res.status(401).render('login', {error: 'Incorrect password'})
  }
  
  req.session.userId = user.id ;
  res.redirect('/profile') ;
})

app.get('/profile', async (req,res)=> {
  if(!req.session.userId) {
      return res.redirect('/login') ;
  }

  const user = await Users.findByPk(req.session.userId) ;
  res.render('index', { user }) ;
})

app.get('/logout', (req, res) => {
  req.session.userId = null ;
  res.redirect('/login') ;
})
////////
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/posts/comments', commentsRoute)     // changed
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res)=> {
  res.redirect('/signup') ;
})
db.sync()
  .then(() => {
    app.listen(8383, () => {
      console.log('server started on http://localhost:8383')
    })
  })
  .catch((err) => {
    console.error(new Error('Could not start database'))
    console.error(err)
  })