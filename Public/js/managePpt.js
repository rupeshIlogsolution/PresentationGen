// let urlVal='http://localhost:2800';
let urlVal='https://presentation.awlinternational.com';

let globalVar;

let pptid = localStorage.getItem('pptId');
(
    async function generateable() {
        // const dakbj = await fetch(`https://presentation.awlinternational.com/api/getOnePresentation/${pptid}`, {
            const dakbj = await fetch(`${urlVal}/api/getOnePresentation/${pptid}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userId': localStorage.getItem('userId'),
            }
        })
        const jk = await dakbj.json()
        if (!jk.title) { window.location.href = '/login'; return 0 }
        globalVar = jk
        document.getElementById('pptTitle').innerHTML = jk.title;
        document.getElementById('pptTitleinp').value = jk.pptId;

        let html = '';
        for (let i = 0; i < jk.presentationImg.length; i++) {
            html = html + `<tr class='childDiv' id=${i} style='cursor:move;'>`;
            for (let j = 0; j < 1; j++) {
                html = html + `<th scope='row'>${i + 1}</t > `;
                html = html + `<td>${jk.presentationImg[i]}</td >`;
                html = html + `<td class='action_td'>
                <div class='image_preview'> <img src='../image/Uploaded/${jk.presentationImg[i]}'/></div>
                <div class='delete_icons'  onclick=handleDeleteImg(\'${jk.presentationImg[i]}\')>
                <img src='https://lh3.googleusercontent.com/G2jzG8a6-GAA4yhxx3XMJfPXsm6_pluyeEWKr9I5swUGF62d2xo_Qg3Kdnu00HAmDQ' alt='Delete Icons'/>
                    </div>
                </td>`;
            }
            html = html + ' </tr>';
        }
        document.getElementById('table_body').innerHTML = html;

        let uuIdTable = '';

        for (let i = 0; i < jk.uuId.length; i++) {
            uuIdTable = uuIdTable + `<tr class='uuidDiv' id=${i}>`;
            for (let j = 0; j < 1; j++) {
                uuIdTable = uuIdTable + `<th scope='row'>${i + 1}</th> `;
                uuIdTable = uuIdTable + `<td>${jk.uuId[i].uuid}</td>`;
                uuIdTable = uuIdTable + `<td>${jk.uuId[i].cust_name}</td>`;
                // uuIdTable = uuIdTable + `<td class='d-none' id='ppuurl'>https://presentation.awlinternational.com/Presentation/${jk.pptId}/${jk.uuId[i].uuid}</td >`;
                uuIdTable = uuIdTable + `<td class='d-none' id='ppuurl'>${urlVal}/Presentation/${jk.pptId}/${jk.uuId[i].uuid}</td >`;
                // uuIdTable = uuIdTable + `<td class='action_tr_a '><a href=http://localhost:2800/Presentation/${jk.pptId}/${jk.uuId[i].uuid} target='_blank'>URL</a> <span class="action_a copy_a" onclick='handleCopyUrl()' > Copy Url</span><span class='action_a delete_a' onclick=handleDeleteUuid(\'${jk.uuId[i].uuid}\')> Delete </span> </td>`;
                // uuIdTable = uuIdTable + `<td class='action_tr_a '><a href=https://presentation.awlinternational.com/Presentation/${jk.pptId}/${jk.uuId[i].uuid} target='_blank'>URL</a> <span class='action_a delete_a' onclick=handleDeleteUuid(\'${jk.uuId[i].uuid}\')> Delete </span> </td>`;
                uuIdTable = uuIdTable + `<td class='action_tr_a '><a href=${urlVal}/Presentation/${jk.pptId}/${jk.uuId[i].uuid} target='_blank'>URL</a> <span class="action_a copy_a" onclick='handleCopyUrl()' > Copy Url</span><span class='action_a delete_a' onclick=handleDeleteUuid(\'${jk.uuId[i].uuid}\')> Delete </span> </td>`;
            }
            uuIdTable = uuIdTable + ' </tr>';
        }
        document.getElementById('uuid_tbody').innerHTML = uuIdTable;
    })();

const dragArea = document.querySelector('#table_body');
let getData = new Sortable(dragArea, {
    animation: 350,
});


const handleSaveChanges = async () => {
    const trdata = document.getElementsByClassName('childDiv');
    let arr = Object.keys(trdata);
    let imageCollection = []

    arr.map((i) => {
        imageCollection.push(globalVar.presentationImg[trdata[i].id])
    });

    globalVar.presentationImg = imageCollection;

    const updateData = await fetch(`${urlVal}/api/updatePpt`, {
    // const updateData = await fetch('https://presentation.awlinternational.com/api/updatePpt', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(globalVar)
    })
    const responseData = await updateData.json();
    if (responseData.Message === 'Done') {
        alert('Changes are Saved');
        window.location.reload();
    }
}


const handleToggleSection = (btnType) => {
    if (btnType === 'url') {
        document.getElementById('imgBtn').style.display = 'inline'
        document.getElementById('gene_url_btn').style.display = 'inline'
        document.getElementById('url_sec').style.display = 'block'
        document.getElementById('urlBtn').style.display = 'none'
        document.getElementById('add_img_btn').style.display = 'none'
        document.getElementById('img_sec').style.display = 'none'
    }
    if (btnType === 'image') {
        document.getElementById('imgBtn').style.display = 'none'
        document.getElementById('gene_url_btn').style.display = 'none'
        document.getElementById('url_sec').style.display = 'none'
        document.getElementById('urlBtn').style.display = 'inline'
        document.getElementById('add_img_btn').style.display = 'inline'
        document.getElementById('img_sec').style.display = 'block'
    }
}


const handleGenerateUuid = async () => {
    const cust_name = document.getElementById('cust_name').value;

    const pptTitleData = { pptId: globalVar.pptId, customerName: cust_name }
    const generateUuid = await fetch(`${urlVal}/api/addUuId`, {
    // const generateUuid = await fetch('https://presentation.awlinternational.com/api/addUuId', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pptTitleData)
    })
    const responseData = await generateUuid.json();
    if (responseData.status === 'Success') {
        alert('Uuid Generated');
        window.location.reload();
    }
}

const handleDeleteUuid = async (id) => {
    const pptTitleData = { pptId: globalVar.pptId, uuId: id }
    const generateUuid = await fetch(`${urlVal}/api/deleteUuId`, {
    // const generateUuid = await fetch('https://presentation.awlinternational.com/api/deleteUuId', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pptTitleData)
    })
    const responseData = await generateUuid.json();
    if (responseData.status === 'Success') {
        alert('Uuid Deleted');
        window.location.reload();
    }
}
const handleDeleteImg = async (img_name) => {
    const pptTitleData = { pptId: globalVar.pptId, img: img_name }
    const generateUuid = await fetch(`${urlVal}/api/deleteImage`, {
    // const generateUuid = await fetch('https://presentation.awlinternational.com/api/deleteImage', {
        // method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pptTitleData)
    })
    const responseData = await generateUuid.json();
    if (responseData.status === 'Success') {
        alert('Image Deleted');
        window.location.reload();
    }
}


const handleCopyUrl = async () => {

    // let copyText= document.getElementById('ppuurl');
    // // copyText.select();AbstractRange(0,99999);
    // navigator.clipboard.writeText(copyText.innerHTML);
    // alert('URL Copied')


    var selection = window.getSelection();
    var emailLink = document.querySelector('#ppuurl');

    selection.removeAllRanges();
    var range = document.createRange();
    range.selectNode(emailLink);
    selection.addRange(range);

    window.navigator.clipboard.writeText(emailLink.textContent)
        .then(() => alert('URL Copied successful'))
        .catch(err => alert('URL Copied failed'));

}