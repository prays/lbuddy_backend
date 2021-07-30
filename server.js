const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const helmet = require('helmet');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const setCourses = require('./controllers/setCourses');
const getCourses = require('./controllers/getCourses');
const setWCS = require('./controllers/setWCS');
const getWCS = require('./controllers/getWCS');
const getParticular = require('./controllers/getParticular');
const recommendations = require('./controllers/Recommendations');
const auth = require('./controllers/authorization');
const profile = require('./controllers/profile');
const saltRounds = 12;

// const db = knex({
//   client: 'mysql2',
//   connection: {
//     host : '127.0.0.1',
//     user : 'root',
//     password : 'kucingmeong',
//     database : 'project'
//   }
// });

const db = knex({
    client: 'mysql2',
    connection: {
      host : 'learningbuddy.cdfxjommi3zh.ap-southeast-1.rds.amazonaws.com',
      user : 'admin',
      password : 'kucingmeong',
      database : 'learningbuddy'
    }
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));

const whitelist = ['http://localhost:3000', 'http://13.213.141.109:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.get('/', (req, res) => { res.send('Working') });
app.get('/profile/:email', auth.requireAuth(db), profile.handleProfileGet(db));
app.post('/sign-in', signin.handleAuthentication(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt, saltRounds));
app.post('/set-courses', auth.requireAuth(db), setCourses.handleSetCourses(db));
app.post('/get-courses', auth.requireAuth(db), getCourses.handleGetCourses(db));
app.post('/set-wcs', auth.requireAuth(db), setWCS.handleSetWCS(db))
app.post('/rec', auth.requireAuth(db), recommendations.handleRecommendations(db));
app.post('/get-wcs', auth.requireAuth(db), getWCS.handleGetWCS(db));
app.get('/get-particular', auth.requireAuth(db), getParticular.handleGetParticular(db))

PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}`);
})