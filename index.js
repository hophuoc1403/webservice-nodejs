import express from 'express'
import session from 'express-session'

import dotenv from  'dotenv'
import rateLimit from "express-rate-limit";
dotenv.config()

const app = express()
const port = 3000

app.get('/', (req, res) => {
    const {name = 'user'} = req.query
    res.send(`Hello ${name}`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

const secret = process.env.SESSION_SECRET
const store = new session.MemoryStore()
const protect = (req, res, next) => {
    const {authenticated} = req.session
    if (!authenticated) {
        res.sendStatus(401)
    } else {
        next()
    }
}


app.use(
    session({
        secret,
        resave: false,
        saveUninitialized: true,
        store
    }),
    rateLimit(
        {
            windowMs:15*60*1000, // 15 minutes
            max : 5, // 5 calls
        }
    )
)

app.get('/login',(req,res) => {
    const {authenticated} = req.session

    if(!authenticated){
        req.session.authenticated = true
        res.send('successfully authenticated')
    }else {
        res.send('already authenticated')
    }
})

app.get('/logout',protect,(req,res) => {
    req.session.destroy(()=>{
        res.send("Successfully logged out")
    })
})

app.get('/protected',protect,(req,res) => {
    const {name = 'user'} = req.query
    res.send(`Hello ${name}`)
})