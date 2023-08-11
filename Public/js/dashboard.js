let globalVar;
let urlVal = 'http://localhost:2800';
// let urlVal='https://presentation.awlinternational.com';
(
    async function getAllData() {
        const dakbj = await fetch(`${urlVal}/api/getAllPresentation`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'userId': localStorage.getItem('userId'),
                }
            })

        const jk = await dakbj.json()
        if (jk.allPresentation) {
            globalVar = jk
            document.getElementById('totalPPtno').innerHTML = jk.allPresentation.length;
            let news = '';
            for (let i = 0; i < jk.allPresentation.length; i++) {

                news = news + ` <a id='pptCard' value='${i}'  class='presentaion_link'>
                        <div class='presentaion'>
                             <div class='presentaion_title'>
                                   <span class='presentaion_title_icon' title='${jk.allPresentation[i].title}'>${jk.allPresentation[i].title}</span>
                                   <span class="material-symbols-outlined text-danger" onclick=handleDeletePPt(\'${jk.allPresentation[i].pptId}\')>delete</span>
                             </div>
                             <div class='presentation_img' onclick=handleClcik(\'${jk.allPresentation[i].pptId}\')> </div>
                                <small>Total No. of imgage:-${jk.allPresentation[i].presentationImg.length}</small>
                         </div>
                                 </a>`;
            }
            document.getElementById('allInnerPPtcard').innerHTML = news;
        }
        else {
            window.location.href = '/login'
        }
    }
)()

const handleClcik = (dc) => {
    localStorage.setItem('pptId', dc);
    window.location.href = '/managePresentation';
}

const handleLogout = () => {
    localStorage.clear();
    window.location.href = './login'
}

const handleDeletePPt = async (pptId) => {
    const dakbj = await fetch(`${urlVal}/api/deletePresentation`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userId': localStorage.getItem('userId'),
                'pptId': pptId
            }
        })

    const jk = await dakbj.json()
    if (jk.statusMssg === "success") {
        alert(jk.Message);
        window.location.reload();
    }
    else {
        alert(jk.Message);
    }
}