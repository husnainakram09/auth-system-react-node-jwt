import express, { Request, Response } from "express";
const router = express.Router();
const fs = require('fs');
const jwt =require('jsonwebtoken')

interface User {
    email: string,
    password: string
}
// Fake user for testing purpose
const User: User = {
    email: 'test@exus.com',
    password: 'test1122'
}

// Auth Endpoint
router.post('/login', async (req: Request, res: Response) => {

    const user = (req.body.email == User.email) && User;

    // Check if user exist with this email
    if (!user) {
        return res.status(400).send('The user not found');
    }

    // Check if entered password is correct
    if (user.email == req.body.email && user.password == req.body.password) {
        const KEY=process.env.JWT_SECRET
        const token = jwt.sign({email:User.email, date: Date()},KEY,{expiresIn: 1})
        return res.status(200).send({'msg':`${User.email} logged in successfully!`, token});
    } else if (user.password != req.body.password) {
        return res.status(400).send('password is wrong!');
    } else {
        return res.status(401).send('something went wrong!');
    }
})

// Store user data endpoint
router.post('/store-user', async (req: Request, res: Response) => {
    const { body } = req
    let userFile = fs.readFileSync('./data/users.json', "utf8")
    let content;
    if (userFile) {
        userFile = JSON.parse(userFile)
        content = [...userFile, body]
    } else {
        content = [body]
    }

    fs.writeFile('./data/users.json', JSON.stringify(content), (err: any) => {
        if (err) throw err
        res.status(200).send('Successfully saved!')
    })
})

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

export default router;
