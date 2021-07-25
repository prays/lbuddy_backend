const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const setCourses = require('./controllers/setCourses');
const getCourses = require('./controllers/getCourses');
const setWCS = require('./controllers/setWCS');
const getParticular = require('./controllers/getParticular');
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
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Working') });
app.post('/sign-in', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt, saltRounds));
app.post('/set-courses', setCourses.handleSetCourses(db));
app.post('/get-courses', getCourses.handleGetCourses(db));
app.post('/set-wcs', setWCS.handleSetWCS(db))
app.get('/get-particular', getParticular.handleGetParticular(db))

PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}`);
})