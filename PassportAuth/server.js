import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { User } from './Models/UserModel.js';
import passport from 'passport';
import configurePassport from './config/passport.js';
import session from 'express-session';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: false, // resave session on every request even if there is no change in session, inefficient(More writes operations)
    saveUninitialized: false, //if true, empty session will be created for all requests, stored in server and in client cookie, inefficient for most of the cases.
  })
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);
const uri =
  'mongodb+srv://learning:IndiumSql!135@cluster0.dpkff5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect(uri, {
    dbName: 'PassportAuth',
  })
  .then(() => {
    console.log('Connected to mongodb PassportAuth');
  })
  .catch((err) => {
    console.error(err);
  });
app.listen('3004', () => {
  console.log('server started listening on port 3004');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

app.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local'),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', checkAuthenticated, (req, res) => {
  console.log('Inside /profile req.user:', req.user);
  res.render('profile');
});
app.get('/dashboard', checkAuthenticated, (req, res) => {
  console.log('Inside /dashboard req.user:', req.user, req.isAuthenticated());
  res.json(req.user);
});

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  console.log('register request', req.isAuthenticated());
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    name: req.body.name,
    password: hashedPassword,
  };
  const compareTest = await bcrypt.compare('test', hashedPassword);
  const userDetails = new User(user);
  await userDetails.save();
  res.redirect('/login');
  console.log('crypt', user, compareTest);
});

function checkAuthenticated(req, res, next) {
  console.log('IsAuthenticated', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile');
  }
  next();
}
