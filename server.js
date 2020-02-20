const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const db = require('./models')
let PORT = process.env.PORT || 3000


//==========

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(
    bodyParser.json()
)
app.use(cors())
app.use(express.static(path.join(__dirname)))

app.get('/', (req, res, next) => {
    console.log('Get on root called')
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/top5', async (req, res, next) => {
    console.log
    const {name, wpm} = req.body
    if (name && wpm) {
        const winner = new db.Gamer({name, time: wpm})
        const success = await winner.save()
        if (success) {
            res.status(201).json(success)

            console.log("success in adding gamer")
        } else {
            res.status(500).json(new Error('Error saving to database'))
        }
    }
})

app.get('/top5', async (req, res, next) => {
    console.log('Getting the top 5...')
    let top5
    try{
    top5 = await db.Gamer.find().sort({'time': -1}).limit(5)
    } catch (e) {
        console.log('error in retrieving top 5')
        console.log(e)
        res.status(500).json(new Error('Error saving to database'))
    }
    console.log(`top 5 found ${top5.length}`)
    res.json(top5)
})

app.get('*', (req, res, next) => {
    // console.log(req.url)
    // console.log("Unknown request")
    res.sendFile(path.join(__dirname, 'Error404Page.html'))
})

app.listen(PORT, () => {
    console.log(`I connected on port ${PORT}`)
})

app.post('/', async (req, res, next) => {
    console.log(`Full request: ${req}`);
    console.log(`Request body: ${req.body}`)
    
})


