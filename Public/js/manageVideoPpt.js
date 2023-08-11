// let urlVal = 'http://localhost:2800';
let urlVal='https://presentation.awlinternational.com';

let globalVar;

// --------------------- Handle Copy URL ----------------------------------
const handleCopyUrl = async () => {
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
// ---------------------- Handle Generate UUid ------------------------------
const handleGenerateUuid = async () => {
    const cust_name = document.getElementById('cust_name').value;

    const pptTitleData = { pptId: globalVar.pptId, customerName: cust_name }
    const generateUuid = await fetch(`${urlVal}/api/addVideoUuId`, {
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

// ----------------- Handle Delete UUID -----------------------------

const handleDeleteUuid = async (id) => {
    const pptTitleData = { pptId: globalVar.pptId, uuId: id }
    const generateUuid = await fetch(`${urlVal}/api/deleteVideoUuId`, {
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


let pptid = localStorage.getItem('videoPptId');
(
    async function generateable() {
        const dakbj = await fetch(`${urlVal}/api/getOneVideoPresentation/${pptid}`, {
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

        let uuIdTable = '';

        for (let i = 0; i < jk.uuId.length; i++) {
            uuIdTable = uuIdTable + `<tr class='uuidDiv' id=${i}>`;
            for (let j = 0; j < 1; j++) {
                uuIdTable = uuIdTable + `<th scope='row'>${i + 1}</th> `;
                uuIdTable = uuIdTable + `<td>${jk.uuId[i].uuid}</td>`;
                uuIdTable = uuIdTable + `<td>${jk.uuId[i].cust_name}</td>`;
                // uuIdTable = uuIdTable + `<td class='d-none' id='ppuurl'>https://presentation.awlinternational.com/Presentation/${jk.pptId}/${jk.uuId[i].uuid}</td >`;
                uuIdTable = uuIdTable + `<td class='d-none' id='ppuurl'>${urlVal}/VideoPresentation/${jk.pptId}/${jk.uuId[i].uuid}</td >`;
                // uuIdTable = uuIdTable + `<td class='action_tr_a '><a href=http://localhost:2800/Presentation/${jk.pptId}/${jk.uuId[i].uuid} target='_blank'>URL</a> <span class="action_a copy_a" onclick='handleCopyUrl()' > Copy Url</span><span class='action_a delete_a' onclick=handleDeleteUuid(\'${jk.uuId[i].uuid}\')> Delete </span> </td>`;
                // uuIdTable = uuIdTable + `<td class='action_tr_a '><a href=https://presentation.awlinternational.com/Presentation/${jk.pptId}/${jk.uuId[i].uuid} target='_blank'>URL</a> <span class='action_a delete_a' onclick=handleDeleteUuid(\'${jk.uuId[i].uuid}\')> Delete </span> </td>`;
                uuIdTable = uuIdTable + `<td class='action_tr_a '><a href=${urlVal}/VideoPresentation/${jk.pptId}/${jk.uuId[i].uuid} target='_blank'>URL</a> <span class="action_a copy_a" onclick='handleCopyUrl()' > Copy Url</span><span class='action_a delete_a' onclick=handleDeleteUuid(\'${jk.uuId[i].uuid}\')> Delete </span> </td>`;
            }
            uuIdTable = uuIdTable + ' </tr>';
        }
        document.getElementById('uuid_tbody').innerHTML = uuIdTable;
    })();

const dragArea = document.querySelector('#table_body');
let getData = new Sortable(dragArea, {
    animation: 350,
});


const handleDeleteImg = async (img_name) => {
    const pptTitleData = { pptId: globalVar.pptId, img: img_name }
    const generateUuid = await fetch(`${urlVal}/api/deleteImage`, {
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