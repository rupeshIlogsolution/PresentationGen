const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5600;
const app = express();
const data = require('./data.json')
let pptData = require('./allPPt.json')
const { uploadImg, fileData } = require('./multer');
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// --------------------- Load Public Folder
app.use('/css', express.static(path.resolve(__dirname + '/Public/css')))
app.use('/js', express.static(path.resolve(__dirname + '/Public/js')))
app.use('/image', express.static(path.resolve(__dirname + '/Public/image')))





// --------------------------- Routes ----------------------
app.get('/', (req, res) => {
    res.send('ghjh')
})
app.get('/login', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/Login.html');
})
app.get('/dashboard', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/Dashboard.html');
})
app.get('/managePresentation', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/ManagrPpt.html');

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


// ------------------------- API ---------------------------------------   //
app.post('/api/verifyuser', (req, res) => {
    const userid = req.body.userid;
    const pass = req.body.pass;
    let useStatus = false;
    data.userData.map((i) => { if (userid === i.useId && pass === i.password) { useStatus = true } })
    res.send({
        "status": useStatus,
        "userid": userid
    })
})

app.post("/api/uploadimg", (req, res) => {
    uploadImg(req, res, function (err) {
        if (err) {
            res.send(err)
        }
        else {
            let arrData = [];
            if (typeof (req.body.presentationImg) === 'string') {
                arrData.push(req.body.presentationImg)
            }
            else {
                arrData = [...req.body.presentationImg]
            }
            let newObj = { title: req.body.title, presentationImg: arrData }
            pptData.allPresentation.push(newObj)
            const filepath = path.resolve(__dirname) + '/allPPt.json';
            fs.writeFileSync(filepath, JSON.stringify(pptData))
            res.status(200).send("<script>alert('PPT Created');window.location.href='/dashboard'</script>");
        }
    })
})

app.get("/api/getAllPresentation", (req, res) => {
    let jsonData;
    fs.readFile("./allPPt.json", "utf-8", (err, data) => {
        jsonData = JSON.parse(data)
        res.status(200).send(jsonData);
    })
})
app.get("/api/getOnePresentation/:pptid", (req, res) => {
    let bhjh = 0, th;
    pptData.allPresentation.map((i) => {
        console.log(i)
        if (i.title === req.params.pptid) { bhjh = bhjh + 1; th = i }
    })

    if (bhjh > 0) {
        res.status(200).send(th);
    }
})



app.listen(port, () => {
    console.log(`app is Listen on ${port}`)
})