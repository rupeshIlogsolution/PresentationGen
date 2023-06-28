const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5600;
const app = express();
const data = require('./data.json')
let pptData = require('./allPPt.json')
// const uploadImg = require('./multer');
const multer = require('multer')

const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// --------------------- Load Public Folder
app.use('/css', express.static(path.resolve(__dirname + '/Public/css')))
app.use('/js', express.static(path.resolve(__dirname + '/Public/js')))
app.use('/image', express.static(path.resolve(__dirname + '/Public/image')))

// app.use((req,res,next)=>{
//     console.log(req.url)
//     next();
// })
let imageArr = []
const uploadImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./Public/image/Uploaded")
        },
        filename: function (req, file, cb) {
            let filename = file.originalname + "-" + Date.now() + ".jpg"
            imageArr.push(filename)
            cb(null, filename)
        }
    })

}).array("presentationImg", 12)




// --------------------------- Routes ----------------------
app.get('/', (req, res) => {
    res.send('Done')
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
app.get('/Presentation/:title/:uuid', (req, res) => {
    let bhjh = 0, index = 0;
    for (let i = 1; i <= pptData.allPresentation.length; i++) {
        if (pptData.allPresentation[i - 1].title === req.params.title) { bhjh = bhjh + 1; index = i }
    }
    if (bhjh > 0) {
        let validteUrl = false;
        for (let i = 1; i <= pptData.allPresentation[index - 1].uuId.length; i++) {
            if (pptData.allPresentation[index - 1].uuId[i - 1] === req.params.uuid) {
                validteUrl = true;
            }
        }
        if (validteUrl) {
            res.status(200).sendFile(path.resolve(__dirname) + '/Pages' + '/Home.html');
        }
        else {
            res.status(200).send('URL Expired');
        }
    }
    else {
        res.status(200).send('URL Expired');
    }
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
            res.status(200).send(err);
        }
        else {
            let newObj = { title: req.body.title, presentationImg: imageArr, uuId: [req.body.uuid] }
            pptData.allPresentation.push(newObj)
            const filepath = path.resolve(__dirname) + '/allPPt.json';
            fs.writeFileSync(filepath, JSON.stringify(pptData))
            imageArr = []
            res.status(200).send("<script>alert('PPT Created');window.location.href='/dashboard'</script>");
        }
    })

})

app.post("/api/addimg", (req, res) => {
    uploadImg(req, res, function (err) {
        if (err) {
            res.status(200).send(err);
        }
        else {
            let pptIndex;
            for (let i = 1; i <= pptData.allPresentation.length; i++) {
                if (req.body.title === pptData.allPresentation[i - 1].title) { pptIndex = i }
            }
            if (pptIndex) {
                let newArr = [...pptData.allPresentation[pptIndex - 1].presentationImg, ...imageArr];
                pptData.allPresentation[pptIndex - 1].presentationImg = newArr
                const filepath = path.resolve(__dirname) + '/allPPt.json';
                fs.writeFileSync(filepath, JSON.stringify(pptData))
                imageArr = []
                res.status(200).send("<script>alert('Image Added');window.location.href='/managePresentation'</script>");
            }
            else {
                res.status(400).send("<script>alert('Error');window.location.href='/managePresentation'</script>");
            }
        }
    })

})

app.get("/api/getAllPresentation", (req, res) => {
    let validUser = false;
    for (let i = 1; i <= data.userData.length; i++) {
        if (req.headers.userid === data.userData[i - 1].useId) { validUser = true }
    }
    if (validUser) {
        let jsonData;
        fs.readFile("./allPPt.json", "utf-8", (err, data) => {
            jsonData = JSON.parse(data)
            res.status(200).send(jsonData);
        })
    }
    else {
        res.status(401).send({ Message: 'Unauthorized User' });
    }
})
app.get("/api/getOnePresentation/:pptid", (req, res) => {
    let validUser = false;
    for (let i = 1; i <= data.userData.length; i++) {
        if (req.headers.userid === data.userData[i - 1].useId) { validUser = true }
    }
    if (validUser) {
        let bhjh = 0, th;
        pptData.allPresentation.map((i) => {
            if (i.title === req.params.pptid) { bhjh = bhjh + 1; th = i }
        })
        if (bhjh > 0) {
            res.status(200).send(th);
        }
    }
    else {
        res.status(401).send({ Message: 'Unauthorized User' });
    }
})
app.post("/api/deleteImage", (req, res) => {
    let pptIndex;
    for (let i = 1; i <= pptData.allPresentation.length; i++) {
        if (req.body.title === pptData.allPresentation[i - 1].title) { pptIndex = i }
    }
    if (pptIndex) {
        let newArr = [...pptData.allPresentation[pptIndex - 1].presentationImg]
        newArr.splice(newArr.indexOf(req.body.img), 1);
        pptData.allPresentation[pptIndex - 1].presentationImg = newArr
        const filepath = path.resolve(__dirname) + '/allPPt.json';
        fs.writeFileSync(filepath, JSON.stringify(pptData))
        res.status(200).send({ status: 'Success' });
    }
    else {
        res.status(400).send("<script>alert('Error');window.location.href='/managePresentation'</script>");
    }
})
app.post("/api/addUuId", (req, res) => {
    let pptIndex;
    for (let i = 1; i <= pptData.allPresentation.length; i++) {
        if (req.body.title === pptData.allPresentation[i - 1].title) { pptIndex = i }
    }
    if (pptIndex) {
        let newUuid = uuidv4();
        let newArr = [...pptData.allPresentation[pptIndex - 1].uuId, newUuid];
        pptData.allPresentation[pptIndex - 1].uuId = newArr
        const filepath = path.resolve(__dirname) + '/allPPt.json';
        fs.writeFileSync(filepath, JSON.stringify(pptData))
        res.status(200).send({ status: 'Success' });
    }
    else {
        res.status(400).send("<script>alert('Error');window.location.href='/managePresentation'</script>");
    }
})
app.post("/api/deleteUuId", (req, res) => {
    let pptIndex;
    for (let i = 1; i <= pptData.allPresentation.length; i++) {
        if (req.body.title === pptData.allPresentation[i - 1].title) { pptIndex = i }
    }
    if (pptIndex) {
        let newArr = [...pptData.allPresentation[pptIndex - 1].uuId]
        newArr.splice(newArr.indexOf(req.body.uuId), 1);
        pptData.allPresentation[pptIndex - 1].uuId = newArr
        const filepath = path.resolve(__dirname) + '/allPPt.json';
        fs.writeFileSync(filepath, JSON.stringify(pptData))
        res.status(200).send({ status: 'Success' });
    }
    else {
        res.status(400).send("<script>alert('Error');window.location.href='/managePresentation'</script>");
    }
})
app.post('/api/updatePpt', (req, res) => {
    let indexNo;
    for (let i = 1; i <= pptData.allPresentation.length; i++) {
        if (pptData.allPresentation[i - 1].title === req.body.title) { indexNo = i; }
    }
    if (indexNo) {
        pptData.allPresentation[indexNo - 1] = req.body
        const filepath = path.resolve(__dirname) + '/allPPt.json';
        fs.writeFileSync(filepath, JSON.stringify(pptData))
        res.status(200).send({ "Message": "Done" })
    }
    else {
        res.status(404).send({ "Message": "Error" })

    }
})



app.listen(port, () => {
    console.log(`app is Listen on ${port}`)
})