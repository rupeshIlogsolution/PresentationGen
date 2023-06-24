(
    async function pptData() {
        let urlTitle = window.location.href.split('/')
        const dakbj = await fetch(`http://localhost:2800/api/getOnePresentation/${urlTitle[4]}`)
        const pptData = await dakbj.json()

        // Generate Images Section
        let htmlTag = '', aTag = '';
        for (let i = 0; i < pptData.presentationImg.length; i++) {
            htmlTag = htmlTag + `<div id="pptid-${i + 1}" class="child-div">
            <img src='/image/Uploaded/${pptData.presentationImg[i]}'/> 
            </div>`
            aTag = aTag + `<a href="#pptid-${i + 1}" class="inner-circle">${i + 1}</a>`
        }
        document.getElementById('pptImgSec').innerHTML = htmlTag;
        document.getElementById('pptASec').innerHTML = aTag;
    }
)()



