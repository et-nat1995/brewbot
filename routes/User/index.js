const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../../models/index")
const User = db.User;


users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    // looks for email in the User collection
    User.findOne({
        email: req.body.email
    })
    // if no email is found in the collection, continue on in the hasing process
    .then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {

                        res.json("status:" + " " + user.email + " " + 'Registered!')

                    })
                    .catch(err => {
                        res.send('error:' + err);
                    })
            })
            // if that email is found, send error as that email is already in use
        } else {
            res.json({ error: 'user already exists' })
        }
    })
    .catch (err => {
        res.send("error:" + err)
    });
});


users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // passwords match
                    const payload = {
                        _id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    console.log('incorrect password')
                    // passwords dont match
                    res.json({ error: 'incorrect password' })
                }
            } else {
                res.json({ error: 'User does not exist' })
            }

        })
        .catch(err => {
            res.send('error:' + err)
        })
})


users.get('/profile', (req, res) => {

    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('user does not exist')
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
});

users.get('/searchPage', (req, res) => {

    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('user does not exist')
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
})

module.exports = users;