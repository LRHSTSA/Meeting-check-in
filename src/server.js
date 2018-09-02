const path = require('path')
const express = require('express')
const layout = require('express-layout')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const validator = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const helmet = require('helmet')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

  express.createServer()
    // .use(express.vhost('lrhs.live', express.static('/var/www/html/lwl')))
    // .use(express.vhost('lucasmagno.xyz', express.static('/var/www/html/lucasmagno/')))
    .use(express.vhost('tsa.lrhs.live', app))
    .use(function (req, res) {
      res.send('Sorry, I do not know how to handle that domain.');
    })
    .listen(80);

const middlewares = [
  helmet(),
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded(),
  validator(),
  cookieParser(),
  session({
    secret: 'katie',
    key: 'katie-is-beautiful',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  }),
  flash()
]
app.use(middlewares)

app.use('/', routes)

app.get('/', (req, res) => {
  res.send('index', {
    database: JSON.parse(fs.readFileSync('./db/listofnames.json'))
  })
});

app.use((req, res, next) => {
  res.status(404).send("b{ (Error 404: Not Found)")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('<link rel="stylesheet" href="/style.css" type="text/css" /> <div class="flash flash-error"><h2>Blame <strike>Lucas</strike>, Katie and yourself</h2> <p>But seriously, there are about 10 things that can cause this error because the code for this page is pretty bad. There are probably more than 10 actually, it is <i>really</i> bad. <br><br>Just go back and try again</p> <button onclick="window.location.href=window.location.href" class="btn-error">Go Back</button></div>')
})

app.listen(3000, () => {
  console.log(`App running at http://localhost:3000`)
})