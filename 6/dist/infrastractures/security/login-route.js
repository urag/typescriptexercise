"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, ((err, user, info) => {
        if (err || !user) {
            return res.status(400).send({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, err => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({ email: user.email, role: user.role }, 'theSecret');
            return res.send({ user: token });
        });
    }))(req, res);
});
module.exports.router = router;
//# sourceMappingURL=login-route.js.map