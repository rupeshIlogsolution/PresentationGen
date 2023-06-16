const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5600;
const app = express();
const data = require('./data.json');


app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log('njh',req.url)
    next()
})

app.use(express.static(path.join(__dirname) + '/Public'))
app.use(express.static(path.join(__dirname) + '/Public' + '/css'))


app.get('/login', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/Login.html');
})
app.get('/dashboard', (req, res) => {
    console.log(path.resolve(__dirname) + '/Pages' + '/Dashboard.html')
    res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/Dashboard.html');
})
app.get('/managePresentation', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/ManagrPpt.html');
})


app.post('/verify', (req, res) => {
    const userid = req.body.userid;
    const pass = req.body.pass;
    let useStatus;
    data.userData.map((i) => { if (userid === i.useId && pass === i.password) { useStatus = true } })

    res.send('kmjmk')
    // res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/Login.html');
})
app.get('/Presentation/:uuid', (req, res) => {
    data.uuid.map((i) => {
        if (i === req.params.uuid) {
            res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/Home.html');
            return 0;
        }
        else {
            res.status(401).send('Unauthorize');
        }
    })
})


app.listen(port, () => {
    console.log(`app is Listen on ${port}`)
})