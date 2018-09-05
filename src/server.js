const path = require('path')
const express = require('express')
const layout = require('express-layout')
const bodyParser = require('body-parser')
const routes = require('./routes')
const admin = require('./admin')
const app = express()
const validator = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const helmet = require('helmet')
const connect = require('connect')
const ejsLint = require('ejs-lint');
const bouncy = require('bouncy');



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const middlewares = [
  helmet(),
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded(),
  validator(),
  cookieParser(),
  session({
    secret: '6b617469652d69732d62656175746966756c',
    key: 'shenanigans',
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

// app.get('/', (req, res) => {
//   res.send('index', {
//     database: JSON.parse(fs.readFileSync('./db/listofnames.json'))
//   })
// });

app.use((req, res, next) => {
  res.status(404).send(`<link rel="stylesheet" href="/style.css" type="text/css" />
  <div class="flash flash-error">
      <h2>Oh, hey!</h2>
      <p>Look at you, trying to find a secret page! Sorry, there are no secret pages. Well... actually there is one but I won't tell you about it. And even if you do find it
          you will need a password to get in. Sorry! <br>
      </p>
      <button onclick="document.getElementById('show').style.display = 'block'" class="btn-error">Go Home</button>
      <a style="display: none;" id="show" onclick=""> Did you really thing I was going to send you back? Humans are so lazy...</a>
  </div>`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('<link rel="stylesheet" href="/style.css" type="text/css" /> <div class="flash flash-error"><h2>Blame <strike>Lucas</strike> Katie</h2> <p>But seriously, there are about 10 things that can cause this error because the code for this page is pretty bad. There are probably more than 10 actually, it is <i>really</i> bad. <br><br>Just go back and try again</p> <button onclick="window.location.href=window.location.href" class="btn-error">Go Back</button></div>')
})

let server = bouncy(function (req, res, bounce) {
    if (req.headers.host === 'lrhs.live' || req.headers.host === 'www.lrhs.live') {
        bounce(8001);
    }
    else if (req.headers.host === 'lucasmagno.xyz' || req.headers.host === 'www.lucasmagno.xyz') {
        bounce(8002);
    }
    else if (req.headers.host === 'tsa.lrhs.live') {
      bounce(8080)
    }
});

server.listen(80);

app.listen(8080, () => {
  console.log(`App running at http://localhost:8080`)
})