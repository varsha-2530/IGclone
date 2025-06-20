const express = require('express');
const router = express.Router();
const User = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('../keys');
const requireLogin = require('../middleware/requireLogin')

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
            });
    }

});

router.post('/signin', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(422).json({ msg: 'Please Enter All Deatils' });
    }
    User.findOne({ email: email })
        .then(dbUser => {
            //console.log(dbUser)
            if (!dbUser) {
                return res.status(402).json({ ErrorMessage: 'Not User exist for this email!!' })
            }

            bcrypt.compare(password, dbUser.password)
                .then(() => {
                    // console.log(dbUser)
                    const token = jwt.sign({ id: dbUser._id }, SECRETKEY)
                    //console.log('Token :',token);

                    return res.status(200).json({ msg: "login successfully!!", token })
                });
        });


}); 

router.get('/protected', requireLogin, (req, res) => {
    res.status(200).json({ msg: "Access granted!!" })
});



module.exports = router

