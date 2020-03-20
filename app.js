const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');

const app = express();

// Map global promise
mongoose.Promise = global.Promise

// Connect to mongoose 
mongoose.connect('mongodb://localhost:27017/vidjot', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

//Load Idea Model
require('./models/Idea'); 
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome'
    res.render('index', {
        title: title 
    })
});

// About Route 
app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/ideas', (req, res) => {
    res.render('ideas/ideas')
})
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
})

const port = 5000; 

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})

