const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => console.log(err))
}

const blog_details = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {blog: result, title: 'Blog Details'})
        })
        .catch((err) => 
            res.status(404).render('404', {title: 'Blog not found'})
        );
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create'})
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => console.log(err));
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => console.log(err))
}

const blog_edit_get = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/edit', {blog: result, title: 'Edit'})
        })
        .catch((err) => 
            res.status(404).render('404', {title: 'Blog not found'})
        );
}

const blog_edit_post = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const snippet = req.body.snippet;
    const body = req.body.body;

    Blog.findByIdAndUpdate(id,{"title": title, "snippet": snippet, "body": body})
        .then(result => {
            res.redirect(`/blogs/${id}`)
        })
        .catch(err => console.log(err))
}

const blog_find_get = (req, res) => {
    const value = req.body.valueToFind.toLowerCase()

    Blog.find({$or:
        [
            {title: {$regex :value, $options: 'i' }},
            {snippet: {$regex :value, $options: 'i' }},
            {body: {$regex :value, $options: 'i' }},
        ]
    }, null).sort({createdAt: -1})
    .then((result) => {
        console.log(result)
        res.render('blogs/find', {title: 'Find', blogs: result})
    })
    .catch((err) => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_post,
    blog_find_get
}