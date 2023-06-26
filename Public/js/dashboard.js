let globalVar;
(
    async function getAllData() {
        // const dakbj = await fetch(`http://localhost:2800/api/getAllPresentation`)
        const dakbj = await fetch(`http://192.168.146.169:2800/api/getAllPresentation`)
        const jk = await dakbj.json()
        globalVar = jk
        document.getElementById('totalPPtno').innerHTML = jk.allPresentation.length;
        let news = '';
        for (let i = 0; i < jk.allPresentation.length; i++) {
            let ksk = `\"${jk.allPresentation[i].title}\"`
            news = news + ` <a id='pptCard' value='${i}' onclick='handleClcik(${ksk})' class='presentaion_link'>
                    <div class='presentaion'>
                             <div class='presentaion_title'>
                                   <span class='presentaion_title_icon'>${jk.allPresentation[i].title}</span>
                             </div>
                             <div class='presentation_img'> </div>
                                <small>Total No. of imgage:-${jk.allPresentation[i].presentationImg.length}</small>
                         </div>
                    </a>`;
        }
        document.getElementById('allInnerPPtcard').innerHTML = news;
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
