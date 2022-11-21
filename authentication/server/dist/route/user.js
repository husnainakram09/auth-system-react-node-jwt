"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
// Fake user for testing purpose
const User = {
    email: 'test@exus.com',
    password: 'test1122'
};
// Auth Endpoint
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (req.body.email == User.email) && User;
    // Check if user exist with this email
    if (!user) {
        return res.status(400).send('The user not found');
    }
    // Check if entered password is correct
    if (user.email == req.body.email && user.password == req.body.password) {
        const KEY = process.env.JWT_SECRET;
        const token = jwt.sign({ email: User.email, date: Date() }, KEY, { expiresIn: 1 });
        return res.status(200).send({ 'msg': `${User.email} logged in successfully!`, token });
    }
    else if (user.password != req.body.password) {
        return res.status(400).send('password is wrong!');
    }
    else {
        return res.status(401).send('something went wrong!');
    }
}));
// Store user data endpoint
router.post('/store-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let userFile = fs.readFileSync('./data/users.json', "utf8");
    let content;
    if (userFile) {
        userFile = JSON.parse(userFile);
        content = [...userFile, body];
    }
    else {
        content = [body];
    }
    fs.writeFile('./data/users.json', JSON.stringify(content), (err) => {
        if (err)
            throw err;
        res.status(200).send('Successfully saved!');
    });
}));
// router.get("/user/validateToken", (req, res) => {
//     // Tokens are generally passed in the header of the request
//     // Due to security reasons.
//     let tokenHeaderKey = 'header';
//     let jwtSecretKey = 'user-auth';
//     try {
//         const token = req.header(tokenHeaderKey);
//         const verified = jwt.verify(token, jwtSecretKey);
//         if(verified){
//             return res.send("Successfully Verified");
//         }else{
//             // Access Denied
//             return res.status(401).send('error');
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// });
exports.default = router;
