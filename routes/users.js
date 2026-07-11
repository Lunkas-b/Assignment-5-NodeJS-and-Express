const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User');
})

router.get('/new', (req, res) => {
    res.send('New User');
});

router.post('/', (req, res) => {
    res.send('Create user');
});

router
    .route('/:id')
    .get((req, res) => {
        console.log(req.user)
        res.send(`User Get: ${req.params.id}`);
    }).put((req, res) => {
        res.send(`User Update: ${req.params.id}`);
    }).delete((req, res) => {
        res.send(`User Delete: ${req.params.id}`);
    });

const users = [{ name: 'Kyle'}, { name: 'Sally' }];
router.param('id', (req, res, next, id) => {
    req.user = users[id];
    next();
})

module.exports = router;