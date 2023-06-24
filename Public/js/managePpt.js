let globalVar;

let pptid = localStorage.getItem('pptId');
(
    async function generateable() {
        const dakbj = await fetch(`http://localhost:2800/api/getOnePresentation/${pptid}`)
        const jk = await dakbj.json()
        globalVar = jk
        console.log(jk)
        document.getElementById('pptTitle').innerHTML = jk.title;

        let html = '';
        for (let i = 0; i < jk.presentationImg.length; i++) {
            html = html + `<tr class='childDiv' id=${i} style='cursor:move;'>`;
            for (let j = 0; j < 1; j++) {
                html = html + `<th scope='row'>${i + 1}</t > `;
                html = html + `<td>${jk.presentationImg[i]}</td >`;
                html = html + `<td class='action_td'>
                <div class='image_preview'> <img src='../image/Uploaded/${jk.presentationImg[i]}'/></div>
                <div class='delete_icons'>
                <img src='https://lh3.googleusercontent.com/G2jzG8a6-GAA4yhxx3XMJfPXsm6_pluyeEWKr9I5swUGF62d2xo_Qg3Kdnu00HAmDQ' alt='Delete Icons'/>
                    </div>
                </td>`;
            }
            html = html + ' </tr>';
        }
        document.getElementById('table_body').innerHTML = html;

        let uuIdTable = '';

        for (let i = 0; i < jk.uuId.length; i++) {
            uuIdTable = uuIdTable + `<tr class='childDiv' id=${i}>`;
            for (let j = 0; j < 1; j++) {
                uuIdTable = uuIdTable + `<th scope='row'>${i + 1}</t > `;
                uuIdTable = uuIdTable + `<td>${jk.uuId[i]}</td >`; 
                // uuIdTable = uuIdTable + `<td class='d-none' id='ppuurl'>http://192.168.146.169:2800/Presentation/AWL/${jk.uuId[i]}</td >`;
                uuIdTable = uuIdTable + `<td class='d-none' id='ppuurl'>http://localhost:2800/Presentation/AWL/${jk.uuId[i]}</td >`;
                uuIdTable = uuIdTable + `<td class='action_tr_a '><span class="action_a copy_a" onclick='handleCopyUrl()'> Copy Url</span><span class='action_a delete_a'> Delete </span> </td>`;
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

    const updateData = await fetch('http://localhost:2800/api/updatePpt', {
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
    console.log(btnType)
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


const handleCopyUrl=()=>{
    let copyText= document.getElementById('ppuurl');
    // copyText.select();AbstractRange(0,99999);
    navigator.clipboard.writeText(copyText.innerHTML);
    alert('URL Copied')
}