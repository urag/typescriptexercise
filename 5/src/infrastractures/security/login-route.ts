import { NextFunction } from "connect";
import { User } from "../../buisneslogic/users/model/user";
import { Response, Request } from "express";

const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, ((err: Error, user: User, info: any) => {
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
