import express, { Request, Response } from "express";
const router = express.Router();
const jwt = require('jsonwebtoken')

const fs = require('fs');


router.get('/', async (req: Request, res: Response) => {
    // console.log(req.header('token'))
    // jwt.verify(req.header('token'),process.env.JWT_SECRET)

    try {

        verifyRequest(req.header('token'))
        console.log('verified')
        const dashboardConfig = fs.readFileSync('./data/assignment-configuration.json')
        return res.status(200).send(JSON.parse(dashboardConfig))

    } catch (error) {
        console.log('verified fail')

        return res.status(401).send(error)
    }
})

function verifyRequest(token: any) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export default router