let globalVar;
let urlVal='http://localhost:2800';
// let urlVal='https://presentation.awlinternational.com';
(
    async function getAllData() {
        const dakbj = await fetch(`${urlVal}/api/getAllVideoPPT`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'userId': localStorage.getItem('userId'),
                }
            })

        const jk = await dakbj.json()

        if (jk.allVideoPresentation) {
            globalVar = jk
            document.getElementById('totalPPtno').innerHTML = jk.allVideoPresentation.length;
            let news = '';
            for (let i = 0; i < jk.allVideoPresentation.length; i++) {
                
                news = news + ` <a id='pptCard' value='${i}'  class='presentaion_link'>
                        <div class='presentaion'>
                             <div class='presentaion_title'>
                                   <span class='presentaion_title_icon' title='${jk.allVideoPresentation[i].title}'>${jk.allVideoPresentation[i].title}</span>
                                   <span class="material-symbols-outlined text-danger" onclick=handleDeletePPt(\'${jk.allVideoPresentation[i].pptId}\')>delete</span>
                             </div>
                             <div class='presentation_img' onclick=handleManageVideo(\'${jk.allVideoPresentation[i].pptId}\')> </div>
                             <div class='presentation_tag_name'>
                                <small class='video_small_tag'>${jk.allVideoPresentation[i].presentationVideo}</small>
                            </div>
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

const handleManageVideo = (id) => {
    localStorage.setItem('videoPptId',id);
    window.location.href = '/manageVideoPresentation';
}
const handleLogout = () => {
    localStorage.clear();
    window.location.href = './login'
}