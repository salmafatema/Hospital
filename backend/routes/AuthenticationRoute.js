const express = require('express');
const RegisterModel = require('./models/Register')

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if (user) {
            res.json("Already have an account")
        }else{
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json("Account created"))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

module.exports = AuthenticationRoute;