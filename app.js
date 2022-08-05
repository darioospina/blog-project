const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

const Blog = require('./models/blog');

// express app
const app = express();

const port = process.env.PORT || 3001;

// connect to mongodb
const dbURI = 'mongodb://darioospina:Canada0822@cluster0-shard-00-00.nphiy.mongodb.net:27017,cluster0-shard-00-01.nphiy.mongodb.net:27017,cluster0-shard-00-02.nphiy.mongodb.net:27017/dario-blog?ssl=true&replicaSet=atlas-n2rwvb-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public')) // Creates static files for the frontend. Make the files public/accessible to the browser
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Page not found'});
})