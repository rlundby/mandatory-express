const express = require('express');

const store = require('../store');

const cors = require('cors');

const route = express.Router();

route.use(cors());

// GET /api/products

route.get('/posts', (req, res) => {

    store.getPosts()
        .then(posts => res.json({ posts }));
})

route.get('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);

    store.getPost(postId)
        .then(post => res.json(post))
        .catch(error => {
            res.status(404).json(
                { error }
            );
        });
})

route.delete("/posts", (req, res) => {
    const { id } = req.body;
    store.deletePost(id)
        .then(del => res.json(del))
        .catch(error => {
            res.status(404).json(
                { error }
            );
        });

    }
);

route.post('/posts', (req, res) => {
    const postData = req.body;
    store.addPost(postData)
        .then(newPost => res.json({ newPost }));

})

module.exports = route;
