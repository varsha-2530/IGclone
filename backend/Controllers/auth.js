const express = require('express');
const router = express.Router();
const User = require('../models/auth');
const bcrypt = require('bcrypt');


router.post('/signup', (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(422).json({ msg: 'Please Enter All Deatils' });

    } else {
        User.findOne({ email: email })
            .then(savedUser => {
                if (savedUser) {
                    return res.status(422).json({ msg: 'User is already exist' })
                } else {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            // console.log('Password :',hashedPassword);
                            const user = new User({
                                name,
                                email,
                                password: hashedPassword
                            });
                            user.save()
                            res.status(200).json({ msg: 'User Added Successfully...' })
                        });
                }
            })
    }

});


module.exports = router 