const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// app.use(express.static(__dirname+'/public'));
hbs.registerPartials('views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toLocaleString('vi-VN');
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + "\r\n",(err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(log);
  next();
});
app.use((req,res,next) => {
  res.render('maintain.hbs', {
    pageTitle: 'Maintain',
    content: 'Sorry, under construction!',
  });
})
app.use(express.static('public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return "Anh Anh"
});
hbs.registerHelper('screamIt', (input) => {
  return input.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send("<h1>Wtf is this<h1>");
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    content: 'Welcome to home page!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errCode: 1,
    errMsg: '404 not found!'
  })
});

app.listen('3000', () => {
  console.log("server is up on 3000 port");
});
